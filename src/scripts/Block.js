import React, { Component } from 'react';
import '../styles/EmailBuilder.css';

class Block extends Component {
  state = {
    html: this.props.HTML,
    moveIconSelected: false,
  }

  constructor(props) {
    super(props);
    this.state.html.removeAttribute('data-name');
    this.state.html.removeAttribute('data-description');
    this.state.html.removeAttribute('data-image');
  }

  onDragStart = event => {
    event.target.classList.add('opacity--35');
    this.props.EmailBuilder.setState({dragging: true, blockToBeDraggedKey: this._reactInternalFiber.key});
    event.dataTransfer.setData("text/html", this.props.HTML.outerHTML);
  }

  onDragEnd = event => {
    this.props.EmailBuilder.setState({dragging: false});
    event.target.classList.remove('opacity--35');
    if (this.props.EmailBuilder.state.blocks.length > 1) this.props.EmailBuilder.moveDropArea();
    this.setState({moveIconSelected: false});
  }

  createDropArea = () => {
    if (this.props.EmailBuilder.state.dragging) {
      let index = this.props.EmailBuilder.state.blocks.findIndex(i => i.key === this._reactInternalFiber.key);
      this.props.EmailBuilder.moveDropArea(index);
    }
  }

  selectMoveIcon = event => {
    this.setState({moveIconSelected: true});
  }

  getIndexAndDestroy = () => {
    let i = this.props.EmailBuilder.state.blocks.findIndex(i => i.key === this._reactInternalFiber.key);
    this.props.EmailBuilder.destroy(i)
  }

  render() {
      return (
          <div 
          draggable={this.state.moveIconSelected}
          className="unwrap email-block"
          onDragEnter={this.createDropArea}
          onDragStart={this.onDragStart}
          onDragEnd={this.onDragEnd}
          >
          <span
          className="destroy email-block__exit-icon"
          title="delete"
          onClick={this.getIndexAndDestroy}
          >
            close
          </span>
          <span
          onMouseDown={this.selectMoveIcon}
          onMouseUp={this.deselectMoveIcon}
          className="destroy email-block__move-icon"
          title="move"
          >
            swap_vert
          </span>
          <div className="unwrap" dangerouslySetInnerHTML={{__html: this.state.html.outerHTML}}/>
          </div>
      )
  }
}

export default Block;
