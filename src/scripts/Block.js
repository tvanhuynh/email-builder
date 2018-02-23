import React, { Component } from 'react';
var MediumEditor = require('medium-editor');
var rangy = require('rangy');
require('rangy/lib/rangy-classapplier.js');

class Block extends Component {
  state = {
    html: this.props.HTML,
    moveIconSelected: false,
    mandatory: this.props.HTML,
    colors: this.props.EmailBuilder.state.colors,
  }

  constructor(props) {
    super(props);
    this.state.html.removeAttribute('data-name');
    this.state.html.removeAttribute('data-description');
    this.state.html.removeAttribute('data-image');

    let temp = [...this.props.HTML.classList];
    this.mandatory = temp.includes("mandatory") || temp.includes("header-block") || temp.includes("footer-block");
    this.fixed = temp.includes("header-block") || temp.includes("footer-block");
    this.unique = temp.includes("unique") || temp.includes("header-block") || temp.includes("footer-block");
    
    [...this.state.html.getElementsByTagName('img')].forEach(i => i.setAttribute("draggable", "false"));
    [...this.state.html.getElementsByTagName('a')].forEach(i => {
      i.setAttribute("draggable", "false");
    });

    let colors = [...this.props.HTML.getElementsByClassName('colors')].pop();
    if (colors) {
      colors = [...colors.getElementsByTagName('li')];
      colors = colors.map(i => i.innerHTML);
      if (colors.length) this.setState({colors: colors});
    }
  }

  destroy = () => {
    let i = this.props.EmailBuilder.state.blocks.findIndex(i => i.key === this._reactInternalFiber.key);
    this.props.EmailBuilder.destroy(i)
  }

  duplicate = () => {
    let i = this.props.EmailBuilder.state.blocks.findIndex(i => i.key === this._reactInternalFiber.key);
    this.props.EmailBuilder.duplicate(i, this.props.HTML);
  }

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

  duplicateIcon = () => {
    if (!this.unique) {
      return (
        <span
        className="destroy block-icon email-block__duplicate-icon"
        title="duplicate"
        onClick={this.duplicate}
        >
          filter_none
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

  edit = event => {
    event.preventDefault();
    let classes = [...event.target.classList];

    // check if parent is editable
    let parentIsEditable = false, parent;
    let temp = event.target ? event.target : [];
    while (temp) {
      if ([...temp.classList].includes('editable')) {
        parent = temp;
        temp = false;
        parentIsEditable = true;
      }
      temp = temp.parentNode;
    }

    if (classes.includes('editable') || parentIsEditable) {
      if (event.target.tagName === "IMG") {
        // console.log('this is an editable image')
      } else if (event.target.tagName === "A") {
        // IMAGE   
      } else {
        // TEXT
        if (this.props.EmailBuilder.textEditor.elements[0] !== event.target) {
          this.props.EmailBuilder.textEditor.destroy();

          let extensions = {};
          this.state.colors.forEach(i => {
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
          })

          let target = classes.includes('editable') ? event.target : parent;

          this.props.EmailBuilder.textEditor = new MediumEditor(target, {
            toolbar: {
              buttons: ['bold', 'italic', 'underline', 'anchor', 'highlighter', ...Object.values(extensions)],
            },
            extensions: extensions,
          });
        }
      }
    } else if (classes.includes('editable-fixed')) {
      // console.log('this item is editable-fixed')
    }

    // destroy medium editor if something else is selected.
    if (!(classes.includes('editable') && event.target.tagName !== "IMG" && event.target.tagName !== "A")
      || !parentIsEditable
    ) {
      this.props.EmailBuilder.textEditor.destroy();
    }

    console.log(this.props.EmailBuilder.textEditor)
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
            
            {this.duplicateIcon()}

            {this.blockLine()}

            <div className="unwrap" onClick={this.edit} dangerouslySetInnerHTML={{__html: this.state.html.outerHTML}}/>
            
          </div>
      )
  }
}

export default Block;
