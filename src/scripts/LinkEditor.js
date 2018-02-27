import React, { Component } from 'react';

class LinkEditor extends Component {
    state = {
        target: null,
        text: '',
        url: '#',
        style: null,
    }

    udpateTarget = target => {
        this.setState({
            target: target,
            style: target.getAttribute('style'),
            text: target.innerHTML,
            url: target.getAttribute('href'),
        })
        this.previewLink.setAttribute("style", this.state.style);
    }

    handleTextChange = event => {
        if (event.target.id === "text") {
            this.setState({text: event.target.value})
        } else {
            this.setState({url: event.target.value});
        }
    }

    close = () => {
        this.setState({target: null})
    }

    updateLink = () => {
        let target = this.state.target;
        target.innerHTML = this.state.text;
        target.setAttribute('href', this.state.url)
        this.setState({target: null});
    }

    render() {
        if (this.state.target) {
            return (
                <div id="link-editor" className="destroy">
                    <div id="link-editor-box">
                        <div id="link-editor__text">
                            <label htmlFor="text">Text:</label>
                            <input
                            type="text"
                            id="text"
                            placeholder="Enter the text that will be displayed."
                            value={this.state.text}
                            onChange={this.handleTextChange}
                            />
                        </div>
                        
                        <div id="link-editor__url">
                            <label htmlFor="url">Link URL:</label>
                            <input
                            type="url"
                            id="url"
                            value={this.state.url}
                            placeholder="Enter the URL where the text will lead."
                            onChange={this.handleTextChange}
                            />
                        </div>
    
                        <div className="link-editor-preview">
                            <a ref={input => this.previewLink = input} href={this.state.url}>{this.state.text}</a>
                        </div>
    
                        <div className="link-editor__buttons">
                            <button className="link-editor__buttons--gray" onClick={this.close}>Cancel</button>
                            <button className="link-editor__buttons--blue" onClick={this.updateLink}>Done</button>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (null);
        }
    }
}

export default LinkEditor;