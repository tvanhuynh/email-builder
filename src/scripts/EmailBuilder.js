import React, { Component } from 'react';
import Block from './Block';
import TemplateBlock from './TemplateBlock';
import '../styles/EmailBuilder.css';

class EmailBuilder extends Component {
  state = {
    hasInitiated: false,
    blocks: [],
    templateBlocks: [],
    dragBlockIndex: null,
    dragging: false,
    blockToBeDraggedKey: null,
  }

  constructor(props) {
    super(props);
    this.blocksKey = 0;
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  /**
   * Read imported file and extract block templates
   * @param {object} event - the file change that occurs
   * @return {null} does not return anything
   */

  readEmailImport = event => {
    let file = event.target.files[0];
    let reader = new FileReader();
    let importedHTML;
    let isTemplate;

    reader.onload = file => {
      importedHTML = document.createElement( 'html' );
      importedHTML.innerHTML = file.target.result;

      isTemplate = file.target.result.includes("</body>") ? false : true;
      if (isTemplate) {
        let allBlocks = [...importedHTML.getElementsByClassName('block')];
        let templateBlocks = allBlocks.filter(i => i.dataset.name);
        
        templateBlocks = templateBlocks.map(i => <TemplateBlock EmailBuilder={this} key={i.dataset.name} HTML={i} />);
        this.setState({templateBlocks: templateBlocks});

        this.defaultHTML = allBlocks;

        if (!this.state.hasInitiated) {
          this.moveDropArea(0);
        }
      }
    }

    reader.onloadend = file => {
      if (!isTemplate) {
        let blocks = [...importedHTML.getElementsByClassName('block')];
        blocks = blocks.map(i => {
          this.blocksKey++;
          return <Block EmailBuilder={this} key={this.blocksKey} HTML={i} />
        })
        this.setState({blocks: blocks});
      }

      this.setState({hasInitiated: true})

      // get parent table styles + set in email
      let parentTable = importedHTML.getElementsByTagName('table')[0];
      document.getElementById('parent-table').setAttribute('style', parentTable.getAttribute('style'));
      if (parentTable.style.backgroundColor) {
        document.getElementsByTagName('body')[0].setAttribute(
          'style', "padding: 0; background-color: " + parentTable.style.backgroundColor
        );
      }
    }

    reader.readAsText(file)
  }

  /**
   * Start a new email. Updates the state to the default HTML.
   * @returns {null}
   */
  resetEmail = () => {

    let blocks = this.defaultHTML.map(i => {
      this.blocksKey++;
      return <Block EmailBuilder={this} key={this.blocksKey} HTML={i} />
    })
    
    this.setState({blocks: blocks})
  }

  /**
   * Handle block drop event
   * @param {object} event - event passed
   * @return {null}
   */
  dropBlock = event => {
    event.preventDefault();
    let block = document.createElement( 'html' );
    block.innerHTML = event.dataTransfer.getData("text/html");
    let temp = [...this.state.blocks];
    this.blocksKey++;
    block = <Block EmailBuilder={this} key={this.blocksKey} HTML={block.getElementsByClassName('block')[0]} />;
    temp.splice(this.state.dragBlockIndex + 1, 0, block);
    temp.splice(this.state.dragBlockIndex, 1);
    let index = temp.findIndex(i => i.key === this.state.blockToBeDraggedKey);
    temp.splice(index, 1);
    this.setState({blocks: temp, blockToBeDraggedKey: null, dragBlockIndex: null});
  }

  /**
   * Save the email file by downloading it
   * @return {null}
   */
  download = () => {
    //to do
  }

  /**
   * Append and remove drop areas.
   * @param {number} append - index to append draggable area, will not append if null
   * @return {null}
   */
  moveDropArea = (append = null) => {
    let temp = [...this.state.blocks];
    if (this.state.dragBlockIndex !== null) temp.splice(this.state.dragBlockIndex, 1);

    if (append !== null) {
      let draggableArea = (
        <div id="draggable-area"
        key="drag"
        onDragEnter={event => {event.preventDefault(); event.target.classList.add('opacity--1')}}
        onDragLeave={event => {event.target.classList.remove('opacity--1')}}
        onDragOver={event => {event.preventDefault();}}
        onDrop={this.dropBlock}
        >
          Place template block here.
        </div>
      );
      temp.splice(append, 0, draggableArea);

      this.setState({dragBlockIndex: append})
    } else {
      this.setState({dragBlockIndex: null})
    }


    this.setState({blocks: temp})
  }

  /**
   * Destroy block.
   * @param {number} i - index of block to destroy
   * @return {null}
   */

  destroy = i => {
    let temp = [...this.state.blocks];
    temp.splice(i, 1);
    this.setState({blocks: temp})    
  }

  render() {

    if (this.state.hasInitiated) {
      return (
        <div id="email-builder-app" className="unwrap">

          <table id="parent-table" width="100%" style={this.state.mainBodyStyle} ><tbody><tr><td align="center">
          {this.state.blocks}
            {(() => {if(this.state.blocks.length <= 1 && this.state.blocks[0].key === "drag") {
              return (
                <div>
                  <div id="import-email">
                    <h2 id="import-email__button">Import an old email.</h2>
                    <input id="import-email__input" type="file" accept=".html" onChange={this.readEmailImport} />
                  </div>
                  <div id="start-new-email" onClick={this.resetEmail}>
                    Start a new email.
                  </div>
                </div>
              )
            }})()}
          </td></tr></tbody></table>

          <figure id="download" onClick={this.download}>
            <span id="download__icon">get_app</span>
            <figcaption id="download__caption">Download</figcaption>
          </figure>

          <div id="template-blocks" className="destroy">
            <ul>
              <li id="template-blocks__main-title">Template Blocks</li>
              {this.state.templateBlocks.length ? this.state.templateBlocks : (
                <li id="import-template">
                  <h2 className="template-block__title template-block__title--white">Import Template Blocks</h2>
                  <input id="import-template__input" type="file" accept=".html" onChange={this.readEmailImport} />
                </li>
              )}
            </ul>
          </div>
        </div>
      )
    } else {
        return (
          <div id="import-form" className="whole-page-flex background--blue">
            <div>
              <h1>Please import an email or template file.</h1>
              <div id="import-input">
                <div id="import-input__button">Choose File</div>
                <div id="import-input__file-name">No file selected.</div>
                <input id="import-input__input" type="file" accept=".html" onChange={this.readEmailImport}/>
              </div>
            </div>
          </div>
        )
    }
  }
}

export default EmailBuilder;
