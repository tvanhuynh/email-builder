import React, { Component } from 'react';

class Block extends Component {
  state = {
    html: this.props.HTML,
    moveIconSelected: false,
    mandatory: this.props.HTML
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

  render() {
      return (
          <div 
          className="unwrap email-block line-break-after"
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

            <div className="unwrap" dangerouslySetInnerHTML={{__html: this.state.html.outerHTML}}/>
            
          </div>
      )
  }
}

export default Block;
