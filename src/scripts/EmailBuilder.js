import React, { Component } from 'react';
import Block from './Block';
import TemplateBlock from './TemplateBlock';
import ImageEditor from './ImageEditor';
import LinkEditor from './LinkEditor';
import DownloadBox from './DownloadBox';
import '../styles/EmailBuilder.css';
var MediumEditor = require('medium-editor');
var rangy = require('rangy');
require('rangy/lib/rangy-classapplier.js');

class EmailBuilder extends Component {
  state = {
    hasInitiated: false,
    blocks: [],
    templateBlocks: [],
  }

  constructor(props) {
    super(props);
    this.blocksKey = 0;
    this.draggedBlock = null;
    this.headerBlocks = [];
    this.footerBlocks = [];
  }

  componentDidUpdate() {
    // console.log(this.state);
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
        const headerBlocks = [...importedHTML.getElementsByClassName('header-block')];
        this.headerBlocks = headerBlocks.map(i => {
          this.blocksKey++;
          return (<Block EmailBuilder={this} key={this.blocksKey} HTML={i} />);
        });
        
        const footerBlocks = [...importedHTML.getElementsByClassName('footer-block')];
        this.footerBlocks = footerBlocks.map(i => {
          this.blocksKey++;
          return (<Block EmailBuilder={this} key={this.blocksKey} HTML={i} />);
        });
        
        const allBlocks = [...importedHTML.getElementsByClassName('block')];
        let templateBlocks = allBlocks.filter(i => i.dataset.name);
        
        templateBlocks = templateBlocks.map(i => <TemplateBlock EmailBuilder={this} key={i.dataset.name} HTML={i} />);
        this.setState({templateBlocks: templateBlocks});

        this.defaultHTML = allBlocks;

        let colors = importedHTML.querySelector('#colors');
        colors = [...colors.getElementsByTagName('li')];
        colors = colors.map(i => i.innerHTML);
        this.colorsExtension = this.getColors(colors);

        this.imageBank = importedHTML.querySelector('#image-bank').innerHTML;
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
      } else {
        let style = [...importedHTML.getElementsByTagName('style')];
        style.forEach(i => document.getElementsByTagName('head')[0].appendChild(i));
      }

      this.setState({hasInitiated: true});

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


  /*******************************
   * Block Drag & Drop Functions *
   *******************************/


  /**
   * Append a draggable area to the blocks
   * @param {number} i - index to append the draggable area to
   * @returns {object} draggableArea JSX
   */
  appendDraggableArea = (i = null) => {
    let draggableArea = (
      <div
      id="draggable-area"
      key="drag"
      onDrop={this.dropTemplate}
      onDragOver={event => event.preventDefault()}
      >
        Place template block here.
      </div>
    )
    
    let temp = [...this.state.blocks];

    let oldDrag = this.state.blocks.findIndex(i => i.key === "drag");
    if (oldDrag !== -1) temp.splice(oldDrag, 1);

    if (i !== null) temp.splice(i, 0, draggableArea);

    this.setState({blocks: temp});

    return draggableArea;
  }


  /**
   * Handle template drop event
   * @param {object} event - event passed
   * @return {null}
   */
  dropTemplate = event => {
    event.preventDefault();
    
    // create block
    let data = document.createElement('html');
    data.innerHTML = event.dataTransfer.getData('text/html');
    data = data.getElementsByClassName('block')[0]
    this.blocksKey++;
    let block = <Block EmailBuilder={this} HTML={data} key={this.blocksKey}/>

    // swap block with draggable area
    let index = this.state.blocks.findIndex(i => i.key === "drag");
    let temp = [...this.state.blocks];
    temp.splice(index, 1, block);
    this.setState({blocks: temp})
  }


  /**
   * Update the dragged block status
   * @returns {null}
   */
  updateDraggedBlock = key => {
    let i = this.state.blocks.findIndex(i => i.key === key);
    let temp = [...this.state.blocks];
    this.draggedBlock = temp.splice(i, 1)[0];
  }


  /**
   * Append movable block
   * @param {number} i - index to append the movable block to
   * @returns {null}
   */
  appendMovableBlock = (i) => {
    let temp = [...this.state.blocks];

    let oldBlock = this.state.blocks.findIndex(i => i.key === this.draggedBlock.key);
    if (oldBlock !== -1) temp.splice(oldBlock, 1);

    temp.splice(i, 0, this.draggedBlock);

    this.setState({blocks: temp})
  }


  /**********************
  * Block Manipulation *
  **********************/


  /**
   * Destroy block
   * @param {number} i - index of block to destroy
   * @returns {null}
   */
   destroy = i => {
     let temp = [...this.state.blocks];
     temp.splice(i, 1);
     this.setState({blocks: temp})
   }

   
   /**
    * Move block to top of page
    * @param {number} i - index of block to move
    * @returns {null}
    */
   moveTop = i => {
     let temp = [...this.state.blocks];
     let block = temp.splice(i, 1).pop();
     temp.unshift(block);
     this.setState({blocks: temp});
   }

   
   /**
    * Move block to bottom of page
    * @param {number} i - index of block to move
    * @returns {null}
    */
   moveBottom = i => {
     let temp = [...this.state.blocks];
     let block = temp.splice(i, 1).pop();
     temp.push(block);
     this.setState({blocks: temp});
   }


/********************
 * Helper Functions *
 ********************/


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
   * Create Color Palette in Editor
   * @param {array} colors - HEX colors to be utilized in text
   * @returns {object} extensions of colors to be added to Medium Editor
   */
  getColors = colors => {
    let extensions = {};
    colors.forEach(i => {
      this[i] = MediumEditor.Extension.extend({
        name: i,
      
        init: function () {
          this.button = this.document.createElement('button');
          this.button.classList.add('medium-editor-action');
          this.button.style.backgroundColor = i;
          this.on(this.button, 'click', this.handleClick.bind(this));
          this.classApplier = rangy.createClassApplier('unwrap-color', {
            elementTagName: 'span',
            normalize: true,
            elementAttributes: {
              style: "color: " + i
            }
          });
        },
      
        getButton: function () {
          return this.button;
        },
    
        handleClick: function (event) {
          this.classApplier.toggleSelection();
          this.base.checkContentChanged();
        }
      });
      extensions[i] = new this[i]();
    });

    return extensions;
  }




  /**
   * Save the email file by downloading it
   * @returns {null}
   */
  download = () => {
    //to do
  }
 

  /********************
   * Render Functions *
   ********************/


  /**
   * Print blocks
   * @returns {object} JSX of objects or options to import / start new
   */
  printBlocks = () => {
    if (this.state.blocks.length === 0) {
      return (
        <div>
          <div className="button background--orange text--white">
            Import an old email.
            <input type="file" accept=".html" onChange={this.readEmailImport} />
          </div>
          {/* Check if there's a template to start new email from. */}
          {(() => {if (this.state.templateBlocks.length > 0){ return (
              <button className="button background--blue text--white" onClick={this.resetEmail}>
                Start a new email.
              </button>
          ) }})()}

        </div>
      )
    } else {
      return [...this.headerBlocks, ...this.state.blocks, ...this.footerBlocks];
    }
  }

  /**
   * Toggle template blocks
   * @param {object} event - event click of template block click
   * @returns {null}
   */
  toggleTemplateBlocks = event => {
    if(this.templateBlocks.classList.contains('template-blocks--visible')) {
      this.templateBlocks.classList.remove('template-blocks--visible');
      event.target.classList.remove('template-blocks__toggle--visible')
      this.templateBlocks.classList.add('template-blocks--hidden');
      event.target.classList.add('template-blocks__toggle--hidden')
    } else {
      this.templateBlocks.classList.add('template-blocks--visible');
      event.target.classList.add('template-blocks__toggle--visible')
      this.templateBlocks.classList.remove('template-blocks--hidden');
      event.target.classList.remove('template-blocks__toggle--hidden')
    }
  }


  /**
   * Open Link Editor
   * @param {object} target - the target area that will be edited
   * @returns {null}
   */
  openLinkEditor = target => {
    this.linkEditor.udpateTarget(target);
  }


  /**
   * Open Image Editor
   * @param {object} target - the target area that will be edited
   * @returns {null}
   */
  openImageEditor = target => {
    this.imageEditor.updateTarget(target)
  }


  render() {

    if (this.state.hasInitiated) {
      return (
        <div id="email-builder-app" className="unwrap">

          <table id="parent-table" width="100%" style={this.state.mainBodyStyle} ><tbody><tr><td align="center">

          {this.printBlocks()}

          </td></tr></tbody></table>

          <figure id="download" className="destroy" onClick={this.download}>
            <span id="download__icon">get_app</span>
            <figcaption id="download__caption">Download</figcaption>
          </figure>

          <figure id="remove-class" className="destroy">
            <span id="remove-class__icon">close</span>
          </figure>

          <div id="template-blocks" className="destroy template-blocks--visible" ref={input => {this.templateBlocks = input}}>
            <div id="template-blocks__toggle" className="template-blocks__toggle--visible" onClick={this.toggleTemplateBlocks}>
                Template Blocks
            </div>
            <ul>
              {this.state.templateBlocks.length ? this.state.templateBlocks : (
                <li className="button background--orange text--white">
                  Import Template Blocks
                  <input type="file" accept=".html" onChange={this.readEmailImport} />
                </li>
              )}
            </ul>
          </div>

          <ImageEditor ref={input => {this.imageEditor = input}} bank={this.imageBank} />
          <LinkEditor ref={input => {this.linkEditor = input}}/>
          <DownloadBox />
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
