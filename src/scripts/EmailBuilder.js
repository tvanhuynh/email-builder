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
    this.demo = `<!DOCTYPE html><html><head><style type="text/css">.ReadMsgBody{width: 100%;}.ExternalClass{width: 100%;}p, h1, h2, h3{margin-bottom:0; margin:0}table{table-layout:fixed; border-collapse:collapse; margin:0 auto;}table td{border-collapse: collapse; table-layout:fixed;}body, table, tr, td{font-family: 'Raleway', sans-serif; font-size: 12px; line-height: 1.5;}table tr td{padding: 0;}a{text-decoration: none;}</style><style>@import url('https://fonts.googleapis.com/css?family=Raleway:400,400i,700');</style></head><body><table width="100%" ><tbody><tr><td align="center"><table class="header-block"><tbody><tr><td height="50" valign="bottom" style="padding-bottom: 10px; font-size: 10px; text-transform: uppercase;">This text and the links below are header blocks, so they cannot be deleted or moved.</td></tr></tbody></table><table class="header-block" width="600" border="0" cellpadding="0" cellspacing="0"><tbody><tr><td align="center" style="font-size: px; line-height: 20px; color: #ffffff; padding-top: 10px; padding-bottom: 10px; background-color: #688C98;"><a href="/link1" class="editable" style="color: #ffffff; font-weight: bold; letter-spacing: .1em;">LINK 1</a></td><td width="10"></td><td align="center" style="font-size: px; line-height: 20px; color: #ffffff; padding-top: 10px; padding-bottom: 10px; background-color: #688C98;"><a href="/link2" class="editable" style="color: #ffffff; font-weight: bold; letter-spacing: .1em;">LINK 2</a></td><td width="10"></td><td align="center" style="font-size: px; line-height: 20px; color: #ffffff; padding-top: 10px; padding-bottom: 10px; background-color: #688C98;"><a href="/link3" class="editable" style="color: #ffffff; font-weight: bold; letter-spacing: .1em;">LINK 3</a></td><td width="10"></td><td align="center" style="font-size: px; line-height: 20px; color: #ffffff; padding-top: 10px; padding-bottom: 10px; background-color: #688C98;"><a href="/link4" class="editable" style="color: #ffffff; font-weight: bold; letter-spacing: .1em;">LINK 4</a></td></tr></tbody></table><table class="block" width="600" border="0" cellpadding="0" cellspacing="0"data-name="Single Column"data-description="A single column image with a header and text."data-image="https://raw.githubusercontent.com/tvanhuynh/email-builder/master/src/images/1-Column.png"><tbody><tr><td style="font-size: 0; padding-top: 10px;"><img class="editable fixed-width" width="600" src="https://images.unsplash.com/photo-1518409274682-1cb2fe2955a8"/></td></tr><tr><td style="padding-top: 10px; padding-bottom: 40px;"><h1 class="editable-fixed" style="color: #D6AB85; padding-bottom: 5px;">Welcome to the Email Builder demo!</h1><p class="editable" style="color: #3A4758">Click anywhere in this body of text to start editing the text. This area has a class of "editable", which allows us to stylize it as we please. If you select some of the text, an editor will appear. You can use it to make text bold, italic, underlined, or a hyperlink. If you can't edit the text, that means that the template has not made it editable and there's probably a reason why. Go ahead and click around to edit text.<br><br>You can add more blocks by dragging and dropping a template block from the right side -->. You can also reorder these blocks in anyway you want with the icons that appear on the left hand side, when you hover over a block. To get rid of blocks, click on the remove icon that appears on the right hand side, when you hvoer over a block.<br><br>You can also edit images, click on the big picture up there to open the image editor. Some photos have a "fixed-width" class, which forces any image that you select to have the original width the developer assigned. Images with a class of "editable-fixed" will have the same width and height. Be mindful that this will stretch or shrink the image selected if it's not the right ratio!</p></td></tr></tbody></table><table class="block" width="600" border="0" cellpadding="0" cellspacing="0"data-name="Double Column"data-description="A double column image with a header and text."data-image="https://raw.githubusercontent.com/tvanhuynh/email-builder/master/src/images/2-Column.png"><tbody><tr><td><table><tbody><tr class="removable"><td style="font-size: 0; padding-top: 10px; padding-right: 10px;"><img class="editable-fixed" width="295" src="https://images.unsplash.com/photo-1507963901243-ebfaecd5f2f4" height="195"/></td><td style="font-size: 0; padding-top: 10px;"><img class="editable-fixed" width="295" src="https://images.unsplash.com/photo-1495414849595-b61e06b08381" height="195"/></td></tr><tr><td valign="top" width="295" style="padding-top: 10px; padding-bottom: 20px; padding-right: 10px;"><h1 class="editable-fixed" style="color: #D6AB85; padding-bottom: 5px;">You Can Edit This!</h1><p class="editable" style="color: #3A4758">You can edit practically everything on this page! However if you click on these images, you'll notice that they have an "editable-fixed" class and will constrain the proportions of the image you select.<br><br>You'll also notice that the images above are removable. If you hover over them, a remove icon will appear in the upper right hand corner. It's possible to bring back an item that you removed! Try it out!</p></td><td valign="top" width="295" style="padding-top: 10px; padding-bottom: 20px;"><h1 class="editable-fixed" style="color: #D6AB85; padding-bottom: 5px;">You Can Edit This!</h1><p class="editable" style="color: #3A4758">Often times in emails, you'll find call out links to lead you out of the email. You can edit these callout links by clicking on them.<br><br>Try it out with the button below!</p></td></tr></tbody></table></td></tr><tr><td><div style="background-color: #3A4758; text-align: center; padding-top: 20px; padding-bottom: 20px; color: #ffffff;"><a class="editable" href="#" style="color: #ffffff; font-size: 15px; font-weight: bold; letter-spacing: .1em;">EDIT ME!</a></div></td></tr><tr><td height="50"></td></tr></tbody></table><table width="600" class="footer-block"><tbody><tr><td height="50" valign="top" align="center" style="padding-top: 10px; font-size: 10px; text-transform: uppercase;">So try everything out! Build your own template.<br>This text is a footer block, so it cannot be deleted or moved.</td></tr></tbody></table></td></tr></tbody></table><ul id="colors"><li>#3A4758</li><li>#688C98</li><li>#D6AB85</li></ul><ul id="image-bank"><li> Image Selection<ul><li>https://images.unsplash.com/photo-1518409274682-1cb2fe2955a8</li><li>https://images.unsplash.com/photo-1507963901243-ebfaecd5f2f4</li><li>https://images.unsplash.com/photo-1495414849595-b61e06b08381</li><li>https://images.unsplash.com/photo-1483918793747-5adbf82956c4</li><li>https://images.unsplash.com/photo-1495214783159-3503fd1b572d</li><li>https://images.unsplash.com/photo-1489167287287-0ef0009694a8</li></ul></li></ul></body></html>`;
  }

  componentDidMount() {
    document.getElementById('template-code-sample').value = `<!DOCTYPE html>
<html>
    <head>
      <style type="text/css>

        /* All styles will be transfered to the final email. */

      </style>
    </head>

    <body>
      <table width="100%" style="/* All styles will be transfered ot the final email */">
        <tbody>
          <tr>
            <td align="center">

              <table
              class="block"
              data-name="Sample Template Name"
              data-description="Description of Template" <!-- This is Optional -->
              data-image="URL of Image to Preview Template Block" <!-- This is Optional -->
              >
                ...
              </table>
            
            </td>
          </tr>
        </tbody>
      </table>
    </body>
</html>`;
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
    let isTemplate = false;

    reader.onload = file => {
      importedHTML = document.createElement( 'html' );
      importedHTML.innerHTML = file.target.result;

      importedHTML.querySelectorAll('.block').forEach(i => {
        if(i.dataset.name) isTemplate = true;
      })
      if (isTemplate) {
        const allBlocks = [...importedHTML.getElementsByClassName('block')];
        let templateBlocks = allBlocks.filter(i => i.dataset.name);
        
        templateBlocks = templateBlocks.map(i => <TemplateBlock EmailBuilder={this} key={i.dataset.name} HTML={i} />);
        this.setState({templateBlocks: templateBlocks});

        this.defaultHTML = allBlocks;

        let colors = importedHTML.querySelector('#colors');
        if (colors) {
          colors = [...colors.getElementsByTagName('li')];
          colors = colors.map(i => i.innerHTML);
          this.colorsExtension = this.getColors(colors);
        }

        this.imageBank = importedHTML.querySelector('#image-bank');
        if (this.imageBank) this.imageBank = this.imageBank.innerHTML;
      } else {
        let blocks = [...importedHTML.getElementsByClassName('block')];
        blocks = blocks.map(i => {
          this.blocksKey++;
          return <Block EmailBuilder={this} key={this.blocksKey} HTML={i} />
        })

        this.setState({blocks: blocks});
      }

      if(!this.state.hasInitiated) {
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

        importedHTML.querySelectorAll('style').forEach(i => {
          i.classList.add('user-style');
          document.head.appendChild(i)
        });
      }
    }

    reader.onloadend = file => {

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


  /**
   * Create demo doc.
   */

  createDemo = () => {
    let importedHTML = document.createElement( 'html' );
    importedHTML.innerHTML = this.demo;
    let isTemplate = false;

    importedHTML.querySelectorAll('.block').forEach(i => {
      if(i.dataset.name) isTemplate = true;
    })
    if (isTemplate) {
      const allBlocks = [...importedHTML.getElementsByClassName('block')];
      let templateBlocks = allBlocks.filter(i => i.dataset.name);
      
      templateBlocks = templateBlocks.map(i => <TemplateBlock EmailBuilder={this} key={i.dataset.name} HTML={i} />);
      this.setState({templateBlocks: templateBlocks});

      this.defaultHTML = allBlocks;

      let colors = importedHTML.querySelector('#colors');
      if (colors) {
        colors = [...colors.getElementsByTagName('li')];
        colors = colors.map(i => i.innerHTML);
        this.colorsExtension = this.getColors(colors);
      }

      this.imageBank = importedHTML.querySelector('#image-bank');
      if (this.imageBank) this.imageBank = this.imageBank.innerHTML;
    } else {
      let blocks = [...importedHTML.getElementsByClassName('block')];
      blocks = blocks.map(i => {
        this.blocksKey++;
        return <Block EmailBuilder={this} key={this.blocksKey} HTML={i} />
      })

      this.setState({blocks: blocks});
    }

    if(!this.state.hasInitiated) {
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

      importedHTML.querySelectorAll('style').forEach(i => {
        i.classList.add('user-style');
        document.head.appendChild(i)
      });
    }


    this.setState({hasInitiated: true});
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
    this.downloadBox.makeVisible();
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
          <div className="button background--highlight text--white">
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

          {(() => {
            if (this.state.blocks.length > 0) {
              return (
                <figure id="download" className="destroy" onClick={this.download}>
                  <span id="download__icon">get_app</span>
                  <figcaption id="download__caption">Download</figcaption>
                </figure>
              );
            }
          })()}

          <figure id="remove-class" className="destroy">
            <span id="remove-class__icon">close</span>
          </figure>

          <div id="template-blocks" className="destroy template-blocks--visible" ref={input => {this.templateBlocks = input}}>
            <div id="template-blocks__toggle" className="template-blocks__toggle--visible" onClick={this.toggleTemplateBlocks}>
                Template Blocks
            </div>
            <ul>
              {this.state.templateBlocks.length ? this.state.templateBlocks : (
                <li className="button background--highlight text--white" id="import-template-blocks-button">
                  Import Template Blocks
                  <input type="file" accept=".html" onChange={this.readEmailImport} />
                </li>
              )}
            </ul>
          </div>

          <ImageEditor ref={input => {this.imageEditor = input}} bank={this.imageBank} />
          <LinkEditor ref={input => {this.linkEditor = input}}/>
          <DownloadBox ref={input => {this.downloadBox = input}}/>
        </div>
      )
    } else {
        return (
          <div>
            <nav id="home-navigation">
              <ul>
                <li id="home-navigation__title"><a href="/">Email Builder</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#docs">Docs</a></li>
                <li><a onClick={this.createDemo}>Demo</a></li>
              </ul>
            </nav>
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
            <div id="about" className="text-block">
              <div className="text-block__wrapper">
                <h1>About</h1>
                <p><strong className="text--highlight">Email Builder is a single-paged web application that allows its users to create and edit emails from pre-made templates.</strong> It builds a bridge in communication between developer and marketer, making the email creation process more efficient and less frustrating. This app allows developers to create custom templates that can be used by anyone with local access to the file. No coding experience is necessary to use these templates in Email Builder. Anyone can easily go from template to final email. No sign up or log in necessary. Email Builder allows full privacy of information, as all files are locally stored by the user and are never actually uploaded anywhere.</p>
              </div>
            </div>
            <div id="docs" className="text-block text-block--blue">
              <div className="text-block__wrapper">
                <h1>Docs</h1>
                <h2>How to Create a Template</h2>

                <textarea readOnly="true" id="template-code-sample"></textarea>

                <p>To start off, create a <span className="html-element-text">table</span> element in the body of your email template file, with a total of 1 column and 1 row. It will automatically have a width attribute of 100%, however it is recommended that you add this in while building your template for your own viewing purposes. Any style attributes will be read by the Email Builder. The table’s <span className="html-element-text">td</span> element, will also automatically have an align attribute of center. It is also recommended to include this in your template for your own viewing purposes.</p>

                <p>Inside the table you just created add another table and give it a class “block.” Create it as you see fit and the Email Builder will parse this element and its children as a template block, so long as there is a <span className="html-element-text">data-name=“Some Name”</span> attribute. The user will be able to add, remove, and reorder these template blocks inside the email. Create as many template blocks as you see fit. If there exists an element with the “block” class and no data-name attribute, the block will be added to the email’s reset state, however it will not be added as a template blocks. There are three types of blocks: header block, footer block, and block. Please see the class guide for more information on these block types.</p>
                
                <p>Optionally, after the closing tag of the first table you created, you can create a list of HEX colors to utilize in the template’s Medium Editors. This list will only accept a single level, DO NOT nest list items.</p>

                <p>An additional option, after the closing tag of the first table you created, you can create a list of image URLs to utilize in the template’s image editor. These images will appear in a list format for the user to select from. This list will only accept a two-level nested unordered list. The first level should be grouping titles and the second level should be the direct URLs to the photos.</p>

                <p>All style tags will be imported from the email template file.</p>

                <br /><br />

                <h2>Template Classes</h2>
                <h3>block </h3>
                <p className="class-definition">
                  &mdash; Adding the class “block” to an HTML element will make the email builder parse it as template block.
                </p>

                <h3>header block </h3>
                <p className="class-definition">
                  &mdash; Adding the class “header-block” to an HTML element will make the email builder parse sit as a header block. Header blocks sit at the beginning of the document, in the same order that they are created in the template file. They are not considered template blocks and will not appear in the template block sidebar. Additionally, header blocks are not able to be deleted and cannot be moved around or reordered.
                </p>

                <h3>footer block </h3>
                <p className="class-definition">
                  &mdash; Adding the class “footer-block” to an HTML element will make the email builder parse sit as a footer block. Footer blocks sit at the end of the document, in the same order that they are created in the template file. They are not considered template blocks and will not appear in the template block sidebar. Additionally, footer blocks are not able to be deleted and cannot be moved around or reordered.
                </p>

                <h3>editable </h3>
                <p className="class-definition">
                  &mdash; Adding the class “editable” to an HTML element will make the element editable, according to the element type:
                </p>
                  <ul>
                    <li><span className="html-element-text">a</span> tags will open the link editor, allowing the user to edit the text of the hyperlink and the link to which it leads.</li>
                    <li><span className="html-element-text">img</span> tags will open the image editor, allowing the user to edit the image, alt-text, and link to which the image leads.</li>
                    <li>Container tags, like <span className="html-element-text">span</span> and <span className="html-element-text">td</span> will create a Medium Editor, allowing the user to edit the text directly on the page, with a toolbar of bold, italics, underlink, anchor, and colors set by the user.</li>
                  </ul>

                <h3>editable-fixed </h3>
                <p className="class-definition">
                  &mdash; Adding the class “editable-fixed” to an HTML element will make the element editable with fixed variables, according to the element type:
                </p>
                  <ul>
                    <li><span className="html-element-text">a</span> tags will open the link editor, allowing the user to edit the text of the hyperlink and the link to which it leads. This will be no different than an <span className="html-element-text">a</span> tag with the class “editable.”</li>
                    <li><span className="html-element-text">img</span> tags will open the image editor, allowing the user to edit the image, alt-text, and link to which the image leads. The image will, however, retain the height and width attributes set in the template file.</li>
                    <li>Container tags, like <span className="html-element-text">span</span> and <span className="html-element-text">td</span> will create a Medium Editor, allowing the user to edit the text directly on the page, WITHOUT a toolbar. All styling defined in the template will remain.</li>
                  </ul>

              <h3>fixed-width </h3>
              <p className="class-definition">
                &mdash; Adding the class “fixed-width” to an <span className="html-element-text">img</span> element will force whatever image selected to be constrained to the width attribute specified in the template.
              </p>

              <h3>clearable </h3>
              <p className="class-definition">
                &mdash; Adding the class “clearable” to an HTML element will allow the user to clear all contents of that element. This is useful for when deleting the entire element will affect the template (e.g. removing a <span className="html-element-text">td</span> as opposed to making it empty, for a multi-column layout). The user does have the option to place it back if they choose.
              </p>

              <h3>removable </h3>
              <p className="class-definition">
                &mdash; Adding the class “removable” to an HTML element will allow the user to remove the element entirely from the email. The user does have the option to place it back if they choose.
              </p>

              <h3>repeatable </h3>
              <p className="class-definition">
                &mdash; Adding the class “repeatable” to an HTML element will allow the user to duplicate the element, reorder the element with its neighboring “repeatable” class elements, and delete the elements, as they see fit. 
              </p>
              </div>
            </div>


            <div className="text-block">
              <div className="text-block__wrapper" style={{textAlign: 'center'}}>
                <h3 className="text--main">Created by <a href="https://github.com/tvanhuynh">tvanhuynh</a>, with React.</h3>
              </div>
            </div>
          </div>
        )
    }
  }
}

export default EmailBuilder;
