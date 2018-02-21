import React, { Component } from 'react';
import Block from './Block';
import '../styles/EmailBuilder.css';

class EmailBuilder extends Component {
  onDragStart = event => {
      this.props.EmailBuilder.setState({dragging: true});
      event.dataTransfer.setData("text/html", this.props.HTML.outerHTML)
  }

  onDragEnd = () => {
    this.props.EmailBuilder.setState({dragging: false});
    if (this.props.EmailBuilder.state.blocks.length > 1) this.props.EmailBuilder.moveDropArea();
  }

  render() {
      return (
        <li className="template-blocks__block"
            draggable='true'
            onDragStart={this.onDragStart}
            onDragEnd={this.onDragEnd}
            >
            <h2 className="template-block__title">{this.props.HTML.dataset.name}</h2>
            <img className="template-block__image" src={this.props.HTML.dataset.image} alt="" draggable="false"/>
            <div className="template-block__description">{this.props.HTML.dataset.description}</div>
        </li>
      )
  }
}

export default EmailBuilder;
