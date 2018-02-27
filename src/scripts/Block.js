import React, { Component } from 'react';
var MediumEditor = require('medium-editor');

class Block extends Component {
  state = {
    html: this.props.HTML,
    moveIconSelected: false,
    mandatory: this.props.HTML,
  }

  constructor(props) {
    super(props);
    // remove data attributes from blocks
    this.state.html.removeAttribute('data-name');
    this.state.html.removeAttribute('data-description');
    this.state.html.removeAttribute('data-image');

    // find out properties of block
    let temp = [...this.props.HTML.classList];
    this.mandatory = temp.includes("mandatory") || temp.includes("header-block") || temp.includes("footer-block");
    this.fixed = temp.includes("header-block") || temp.includes("footer-block");
    
    // remove dragging from images and anchor links
    [...this.state.html.getElementsByTagName('img')].forEach(i => i.setAttribute("draggable", "false"));
    [...this.state.html.getElementsByTagName('a')].forEach(i => i.setAttribute("draggable", "false"));
  }

  componentDidMount() {
    // strip HTML of all previous Medium Editors
    this.self.querySelectorAll('.medium-editor-element').forEach(i => {
      i.classList.remove('medium-editor-element');
      i.removeAttribute('contenteditable');
      i.removeAttribute('spellcheck');
      i.removeAttribute('data-medium-editor-element');
      i.removeAttribute('role');
      i.removeAttribute('aria-multiline');
      i.removeAttribute('data-medium-editor-editor-index');
      i.removeAttribute('medium-editor-index');
      i.removeAttribute('data-placeholder');
    });

    // create list of all editable areas
    let allEditables = this.self.getElementsByClassName('editable');
    this.textEditables = [];
    for (let i = 0; i < allEditables.length; i++) {
      if (allEditables[i].tagName !== "IMG" && allEditables[i].tagName !== "A") {
        this.textEditables.push(allEditables[i]);
      }
    }
    let allEditablesFixed = this.self.getElementsByClassName('editable-fixed');
    this.textEditablesFixed = [];
    for (let i = 0; i < allEditablesFixed.length; i++) {
      if (allEditablesFixed[i].tagName !== "IMG") {
        this.textEditablesFixed.push(allEditablesFixed[i]);
      }
    }

    // create editor
    let colorExtensions = this.props.EmailBuilder.colorsExtension;

    if (colorExtensions) {
      this.textEditor = new MediumEditor(this.textEditables, {
        spellcheck: false,
        toolbar: {
          buttons: ['bold', 'italic', 'underline', 'anchor', ...Object.values(colorExtensions)],
        },
        extensions: colorExtensions,
      });
    } else {
      this.textEditor = new MediumEditor(this.textEditables, {
        spellcheck: false,
        toolbar: {
          buttons: ['bold', 'italic', 'underline', 'anchor'],
        }
      });
    }

    // create editor-fixed
    this.textEditorFixed = new MediumEditor(this.textEditablesFixed, {
      spellcheck: false,
      toolbar: false,
    });

    // watch for removable items
    this.self.querySelectorAll('.removable').forEach(i => {
      i.onmouseover = this.removeIconMove;
      i.onmouseleave = () => {
        this.removeIcon.style.opacity = 0;
      }
    })
    this.self.querySelectorAll('.clearable').forEach(i => {
      i.onmouseover = this.removeIconMove;
      i.onmouseleave = () => {
        this.removeIcon.style.opacity = 0;
      }
    })

    // reference remove icon
    this.removeIcon = document.getElementById('remove-class');

    // editable links
    this.self.querySelectorAll('a.editable').forEach(i => {
      i.onclick = this.openLinkEditor;
    });
    this.self.querySelectorAll('a.editable-fixed').forEach(i => {
      i.onclick = this.openLinkEditor;
    });

    // editable images
    this.self.querySelectorAll('img.editable').forEach(i => {
      i.setAttribute('title', 'click to edit image');
    })
  }


  /**********************
   * Block Manipulation *
   **********************/


  destroy = () => {
    this.textEditor.destroy();
    this.textEditorFixed.destroy();
    let i = this.props.EmailBuilder.state.blocks.findIndex(i => i.key === this._reactInternalFiber.key);
    this.props.EmailBuilder.destroy(i);
  }

  moveTop = () => {
    let i = this.props.EmailBuilder.state.blocks.findIndex(i => i.key === this._reactInternalFiber.key);
    this.props.EmailBuilder.moveTop(i);
  }

  moveBottom = () => {
    let i = this.props.EmailBuilder.state.blocks.findIndex(i => i.key === this._reactInternalFiber.key);
    this.props.EmailBuilder.moveBottom(i);
  }


  /*****************************
   * Block Dragging & Dropping *
   *****************************/


  blockStartDrag = event => {
    this.props.EmailBuilder.updateDraggedBlock(this._reactInternalFiber.key)
    
    // create ghost drag
    let temp = document.createElement('div');
    temp.innerHTML = "&nbsp;";
    temp.id = "ghost-drag";
    temp.style.opacity = 0;
    document.getElementsByTagName('body')[0].appendChild(temp);
    event.dataTransfer.setDragImage(temp, 0, 0);

    // styling
    event.target.style.opacity = .5;
    temp = document.getElementsByClassName("block-icon");
    for (let i = 0; i < temp.length; i++) {
      temp[i].style.display = 'none';
    }
  }
  
  blockEndDrag = event => {
    this.props.EmailBuilder.draggedBlock = null;

    // remove ghost drag
    document.getElementById('ghost-drag').remove();

    // styling
    event.target.style.opacity = 1;
    let temp = document.getElementsByClassName("block-icon");
    for (let i = 0; i < temp.length; i++) {
      temp[i].style.display = 'flex';
    }
  }

  dragEnterBlock = event => {
    let i = this.props.EmailBuilder.state.blocks.findIndex(i => i.key === this._reactInternalFiber.key);
    if(this.props.EmailBuilder.draggedBlock === null) { // template
      this.props.EmailBuilder.appendDraggableArea(i)
    } else { // block
      this.props.EmailBuilder.appendMovableBlock(i)
    }
  }


  /*******************
   * Icon generation *
   *******************/


  exitIcon = () => {
    if (!this.mandatory) {
      return (
        <span
        className="destroy block-icon email-block__exit-icon"
        title="delete"
        onClick={this.destroy}
        >
          close
        </span>
      )
    }
  }

  moveIcon = () => {
    if (!this.fixed) {
      return (
        <span
          className="destroy block-icon email-block__move-icon"
          title="move"
          onMouseUp={() => this.setState({moveIconSelected: false})}
          onMouseDown={() => this.setState({moveIconSelected: true})}
          >
            swap_vert
          </span>
      )
    }
  }

  moveTopIcon = () => {
    if (!this.fixed) {
      return (
        <span
          className="destroy block-icon email-block__move-top-icon"
          title="move to top"
          onClick={this.moveTop}
          >
            publish
          </span>
      )
    }
  }

  moveBottomIcon = () => {
    if (!this.fixed) {
      return (
        <span
          className="destroy block-icon email-block__move-bottom-icon"
          title="move to bottom"
          onClick={this.moveBottom}
          >
            file_download
          </span>
      )
    }
  }

  blockLine = () => {
    if (!this.fixed && this.props.EmailBuilder.draggedBlock === null) {
      return (
        <span
          className="destroy block-line block-icon"
          />
      )
    }
  }

  removeIconMove = event => {
    var target = event.target;

    while(target !== null &&
      !target.classList.contains('removable') &&
      !target.classList.contains('clearable') &&
      !target.classList.contains('clearable-undo') &&
      !target.classList.contains('removable-undo')
    ) {
      target=target.parentNode;
    }
  
    if (target === null) return;

    if (target.classList.contains('removable-undo') || target.classList.contains('clearable-undo')) {
      document.getElementById('remove-class__icon').innerHTML = "undo";
      document.getElementById('remove-class').setAttribute('title', 'undo remove');
    } else {
      document.getElementById('remove-class__icon').innerHTML = "close";
      document.getElementById('remove-class').setAttribute('title', 'remove');
    }

    let {top, left, width} = target.getBoundingClientRect();

    let scrollLeft = window.pageXOffset || document.body.scrollLeft,
    scrollTop = window.pageYOffset || document.body.scrollTop;

    this.removeIcon.style.display = 'block';
    this.removeIcon.style.opacity = 1;
    this.removeIcon.style.top = top + scrollTop + 'px';
    this.removeIcon.style.left = left + scrollLeft + width + 'px';

    this.removeIcon.onmouseover = () => {
      if (target.classList.contains('removable-undo')) {
        target.style.maxHeight = "99999999999999999999px";
        target.style.position = 'static';
      } else if (target.classList.contains('clearable-undo')) {
        target.querySelector('.clearable-undo-absolute-position').style.maxHeight = "99999999999999999999px";
        target.querySelector('.clearable-undo-absolute-position').style.position = "static";
      }
      target.style.opacity = .25;
    };

    this.removeIcon.onmouseleave = () => {
      if (target.classList.contains('clearable') || target.classList.contains('removable')) {
        target.style.opacity = 1;
      } else if (target.classList.contains('clearable-undo') || target.classList.contains('removable-undo')) {
        target.style.opacity = 0;
      }

      if (target.classList.contains('removable-undo')) {
        target.style.maxHeight = "15px";
        target.style.position = 'absolute';
      } else if (target.classList.contains('clearable-undo')) {
        target.querySelector('.clearable-undo-absolute-position').style.position = "absolute";
        target.querySelector('.clearable-undo-absolute-position').style.maxHeight = "15px";
      }
    };

    this.removeIcon.onmousedown = event => {
      if (target.classList.contains('clearable')) {
        target.classList.remove('clearable');
        target.classList.add('clearable-undo');
        target.style.opacity = 0;
        target.innerHTML = "<div class='clearable-undo-absolute-position' >" + target.innerHTML + "</div>"
        document.getElementById('remove-class__icon').innerHTML = "undo"

      } else if (target.classList.contains('removable')) {
        target.classList.remove('removable');
        target.classList.add('removable-undo');
        target.style.position = 'absolute';
        target.style.maxHeight = '15px';
        target.style.opacity = 0;
        document.getElementById('remove-class__icon').innerHTML = "undo"

      } else if (target.classList.contains('removable-undo')) {
        target.classList.remove('removable-undo');
        target.classList.add('removable');
        target.style.position = 'static';
        target.style.maxHeight = '';
        target.style.opacity = 1;
        document.getElementById('remove-class__icon').innerHTML = "close"

      } else if (target.classList.contains('clearable-undo')) {
        target.innerHTML = target.querySelector('.clearable-undo-absolute-position').innerHTML;
        target.classList.remove('clearable-undo');
        target.classList.add('clearable');
        target.style.opacity = 1;
        document.getElementById('remove-class__icon').innerHTML = "close"
      }
    }
  }


  /***********
   * Editors *
   ***********/

   openLinkEditor = event => {
     event.preventDefault();
     this.props.EmailBuilder.openLinkEditor(event.target)
   }

  render() {
      return (
          <div 
          className="unwrap email-block"
          draggable={this.state.moveIconSelected}
          onDragEnter={this.dragEnterBlock}
          onDragLeave ={this.dragLeaveBlock}
          onDragStart={this.blockStartDrag}
          onDragEnd={this.blockEndDrag}
          >
            {this.exitIcon()}

            {this.moveIcon()}

            {this.blockLine()}

            {this.moveTopIcon()}
            
            {this.moveBottomIcon()}

            <div
            ref={(input) => { this.self = input; }}
            className="unwrap"
            dangerouslySetInnerHTML={{__html: this.state.html.outerHTML}}
            />
            
          </div>
      )
  }
}

export default Block;
