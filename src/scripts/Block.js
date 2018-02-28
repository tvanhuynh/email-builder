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

    this.watchForEdits();


    // reference remove icon
    this.floatingIcons = document.getElementById('remove-class');

    // create icons
    this.deleteIcon = document.createElement('span');
    this.deleteIcon.innerHTML = 'close';
    this.deleteIcon.id = 'remove-class__delete-icon';
    this.deleteIcon.title = "remove";

    this.addIcon = document.createElement('span');
    this.addIcon.innerHTML = 'add';
    this.addIcon.id = 'remove-class__add-icon';
    this.addIcon.title = 'add'

    this.undoIcon = document.createElement('span');
    this.undoIcon.innerHTML = 'undo';
    this.undoIcon.id = 'remove-class__undo-icon';
    this.undoIcon.title = 'undo';

    this.upIcon = document.createElement('span');
    this.upIcon.innerHTML = 'keyboard_arrow_up';
    this.upIcon.id = 'remove-class__up-icon';
    this.upIcon.title = 'move up';

    this.downIcon = document.createElement('span');
    this.downIcon.innerHTML = 'keyboard_arrow_down';
    this.downIcon.id = 'remove-class__down-icon';
    this.downIcon.title = 'move down';
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
          className="destroy email-block__line block-icon"
          />
      )
    }
  }

  clearFloatingIcons = () => {
    while(this.floatingIcons.firstChild) {
      this.floatingIcons.removeChild(this.floatingIcons.firstChild);
    }
  }

  floatingIconsMove = event => {
    // propagate until correct target is identified
    var target = event.target;
    while(target !== null &&
      !target.classList.contains('removable') &&
      !target.classList.contains('clearable') &&
      !target.classList.contains('clearable-undo') &&
      !target.classList.contains('removable-undo') &&
      !target.classList.contains('repeatable')
    ) {
      target=target.parentNode;
    }
    if (target === null) return;


    // generate proper icons
    if (target.classList.contains('removable-undo') || target.classList.contains('clearable-undo')) {
      this.clearFloatingIcons();
      this.floatingIcons.appendChild(this.undoIcon);
    
    } else if (target.classList.contains('removable') || target.classList.contains('clearable')) {
      this.clearFloatingIcons();
      this.floatingIcons.appendChild(this.deleteIcon);
    
    } else if (target.classList.contains('repeatable')) {
      this.clearFloatingIcons();
      this.floatingIcons.appendChild(this.addIcon);
      if(target.parentNode.getElementsByClassName('repeatable').length > 1) {
        this.floatingIcons.appendChild(this.deleteIcon);
        this.floatingIcons.appendChild(this.upIcon);
        this.floatingIcons.appendChild(this.downIcon);
      }
    }


    // move the floating icons
    let {top, left, width} = target.getBoundingClientRect();
    let scrollLeft = window.pageXOffset || document.body.scrollLeft,
    scrollTop = window.pageYOffset || document.body.scrollTop;
    this.floatingIcons.style.display = 'block';
    this.floatingIcons.style.opacity = 1;
    this.floatingIcons.style.top = top + scrollTop + 'px';
    this.floatingIcons.style.left = left + scrollLeft + width + 'px';


    // delete icon
    this.deleteIcon.onmouseover = () => {
      target.style.opacity = .25;
    }

    this.deleteIcon.onmouseleave = () => {
      target.style.opacity = 1;
    }

    this.deleteIcon.onmousedown = () => {
      if (target.classList.contains('removable') || target.classList.contains('clearable')) {
        this.clearFloatingIcons();
        this.floatingIcons.appendChild(this.undoIcon);
      }

      if (target.classList.contains('removable')) {
        target.classList.remove('removable');
        target.classList.add('removable-undo');
        target.style.opacity = 0;
        target.style.position = 'absolute';
        target.style.maxHeight = '15px';

      } else if (target.classList.contains('clearable')) {
        target.classList.remove('clearable');
        target.classList.add('clearable-undo');
        let wrapper = document.createElement('div');
        wrapper.classList.add('clearable-undo-absolute-position');
        while(target.firstChild) {
          wrapper.appendChild(target.firstChild);
        }
        target.append(wrapper);
        wrapper.style.opacity = 0;
        target.style.opacity = 1;

      } else if (target.classList.contains('repeatable')) {
        target.remove();
      }
    }


    // undo icon
    this.undoIcon.onmouseover = () => {
      if (target.classList.contains('clearable-undo')) {
        target.firstChild.style.maxHeight = "99999999999999999999px";
        target.firstChild.style.position = "static";
        target.firstChild.style.opacity = .25;
      } else if (target.classList.contains('removable-undo')) {
        target.style.opacity = .25;
        target.style.position = 'static';
        target.style.maxHeight = '99999999999999999999px';
      }
    }

    this.undoIcon.onmouseleave = () => {
      if (target.classList.contains('clearable-undo')) {
        target.firstChild.style.maxHeight = "15px";
        target.firstChild.style.position = "absolute";
        target.firstChild.style.opacity = 0;
      } else if (target.classList.contains('removable-undo')) {
        target.style.opacity = 0;
        target.style.position = 'absolute';
        target.style.maxHeight = '15px';
      }
    }

    this.undoIcon.onmousedown = () => {
      this.clearFloatingIcons();
      this.floatingIcons.appendChild(this.deleteIcon);

      if (target.classList.contains('clearable-undo')) {
        target.classList.remove('clearable-undo');
        target.classList.add('clearable');
        while (target.firstChild.firstChild) {
          target.appendChild(target.firstChild.firstChild);
        }
        target.firstChild.remove();

      } else if (target.classList.contains('removable-undo')) {
        target.classList.remove('removable-undo');
        target.classList.add('removable');
        target.style.opacity = 1;
        target.style.position = 'static';
        target.style.maxHeight = '99999999999999999999px';
      }
    }


    // add icon
    this.addIcon.onmousedown = () => {
      let clone = target.cloneNode(true);
      clone.onmouseover = this.floatingIconsMove;
      target.parentNode.insertBefore(clone, target);
      this.watchForEdits();
    }

    
    // up icon
    this.upIcon.onmousedown = () => {
      let prev = target.previousElementSibling;
      if (prev) {
        if (prev.classList) {
          if (prev.classList.contains('repeatable')) {
            target.parentNode.insertBefore(target, prev);
          }
        }
      }
    }

    
    // down icon
    this.downIcon.onmousedown = () => {
      let next = target.nextElementSibling;
      if (next) {
        if (next.classList) {
          if (next.classList.contains('repeatable')) {
            target.parentNode.insertBefore(next, target);
          }
        }
      }
    }

  }

  /*************************
   * Relink editable items *
   *************************/

  watchForEdits = () => {
    // destroy old editors if they exist;
    if (this.textEditor) this.textEditor.destroy();
    if (this.textEditorFixed) this.textEditorFixed.destroy();

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
      if (allEditablesFixed[i].tagName !== "IMG" && allEditablesFixed[i].tagName !== "A") {
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
      i.onmouseover = this.floatingIconsMove;
      i.onmouseleave = () => {
        this.floatingIcons.style.opacity = 0;
      }
    })
    this.self.querySelectorAll('.clearable').forEach(i => {
      i.onmouseover = this.floatingIconsMove;
      i.onmouseleave = () => {
        this.floatingIcons.style.opacity = 0;
      }
    })

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
      i.onclick = this.openImageEditor;
    })
    this.self.querySelectorAll('img.editable-fixed').forEach(i => {
      i.setAttribute('title', 'click to edit image');
      i.onclick = this.openImageEditor;
    })

    // repeatable elements
    this.self.querySelectorAll('.repeatable').forEach(i => {
      i.onmouseover = this.floatingIconsMove;
    })
  }


  /***********
   * Editors *
   ***********/

  openLinkEditor = event => {
    event.preventDefault();
    this.props.EmailBuilder.openLinkEditor(event.target)
  }

  openImageEditor = event => {
    event.preventDefault();
    this.props.EmailBuilder.openImageEditor(event.target)
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
