import React, { Component } from 'react';

class TemplateBlock extends Component {
  templateStartDrag = event => {
    event.dataTransfer.setData('text', this.props.HTML.outerHTML);
  }

  tempalteEndDrag = event => {
    this.props.EmailBuilder.appendDraggableArea();
  }

  render() {
      return (
        <li className="template-blocks__block"
            draggable='true'
            onDragStart={this.templateStartDrag}
            onDragEnd={this.tempalteEndDrag}
            title="Drag and drop this tile to add to the email."
            >
            <h2 className="template-blocks__block__title">{this.props.HTML.dataset.name}</h2>
            <img className="template-blocks__block__image" src={this.props.HTML.dataset.image} alt="" draggable="false"/>
            <div className="template-blocks__block__description">{this.props.HTML.dataset.description}</div>
        </li>
      )
  }
}

export default TemplateBlock;
