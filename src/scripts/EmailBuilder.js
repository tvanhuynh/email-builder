import React, { Component } from 'react';
import Block from './Block';
import '../styles/EmailBuilder.css';

class EmailBuilder extends Component {
  state = {
    hasInitiated: false,
    blocks: [],
    templateBlocks: []
  }

  constructor(props) {
    super(props);

    // this.test = blocks.create('one', 'two');
    // console.log(this.test)

    // this.faaa = blocks.create('onasdfe', 'two');
    // console.log(this.faaa)
  }

  componentDidUpdate() {
    console.log(this.state)
    if (this.state.hasInitiated) {
    }
  }

  /**
   * Read imported file and extract block templates
   * @param {object} event - the file change that occurs
   * @return {null} does not return anything
   */

  readEmailImport = event => {
    let file = event.target.files[0];

    // start reader
    let reader = new FileReader();

    // read through file
    reader.onload = file => {
      // get imported HTML
      let importedHTML = document.createElement( 'html' );
      importedHTML.innerHTML = file.target.result;

      // determine whether template OR Email
      let isTemplate = file.target.result.includes("</body>") ? false : true;

      // get HTML Blocks
      if (isTemplate) {
        let templateBlocks = [...importedHTML.getElementsByClassName('block')];
        templateBlocks.forEach(i => {this.createTemplateBlock(i)});
      }
    }

    reader.onloadend = file => {
      // get imported HTML
      let importedHTML = document.createElement( 'html' );
      importedHTML.innerHTML = file.target.result;

      // append to blocks
      if (!this.state.hasInitiated) {
        let blocks = [...importedHTML.getElementsByClassName('block')];
        blocks.forEach(i => {
          this.setState({blocks: [...this.state.blocks, <Block HTML={i} />]})
        })
      }

      // set state
      this.setState({hasInitiated: true,})

      // get parent table styles + set in email
      let parentTableStyle = importedHTML.getElementsByTagName('table')[0].getAttribute('style');
      document.getElementById('parent-table').setAttribute('style', parentTableStyle);
    }

    reader.readAsText(file)
  }

  /**
  * Create template block
  * @param {object} block - block to create template from
  * @return {null}
  */

  createTemplateBlock = block => {
    let temp = (
      <li className="template-blocks__block" key={block.dataset.name}>
        <h2 className="template-block__title">{block.dataset.name}</h2>
        <img className="template-block__image" src={block.dataset.image} alt=""/>
        <div className="template-block__description">{block.dataset.description}</div>
      </li>
    );
    this.setState({templateBlocks: [...this.state.templateBlocks, temp]})
  }

  render() {

    if (this.state.hasInitiated) {
      return (
        <div id="email-builder-app">

          <table id="parent-table" width="100%" style={this.state.mainBodyStyle} ><tbody><tr><td align="center">
          {this.state.blocks}
          </td></tr></tbody></table>

          <div id="template-blocks">
            <ul>
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
                <div id="import-input__file-name">Click here to select a file to import.</div>
                <input id="import-input__input" type="file" accept=".html" onChange={this.readEmailImport}/>
              </div>
            </div>
          </div>
        )
    }
  }
}

export default EmailBuilder;
