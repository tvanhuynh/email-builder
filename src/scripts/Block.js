import React, { Component } from 'react';
import '../styles/EmailBuilder.css';

class Block extends Component {
  state = {
  }

  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
  }

  render() {
      return (
          <div dangerouslySetInnerHTML={{__html: this.props.HTML}}></div>
      )
  }
}

export default Block;
