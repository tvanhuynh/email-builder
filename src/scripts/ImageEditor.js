import React, { Component } from 'react';

class ImageEditor extends Component {

    state = {
        target: null,
        isFixed: false,
        src: '',
        height: 0,
        width: 0,
        url: '',
        alt: '',
    }

    componentDidMount() {
        this.bank.querySelectorAll('li').forEach(i => {
            if(!i.children.length) {
                let src = i.innerHTML;
                i.innerHTML = `<figure class="image-bank__image" style="background-image:url('${src}')"></figure>`
            }
        })
    }

    handleChange = event => {
        if (event.target.id === 'src') {
            this.setState({src: event.target.value});
        }
    }

    render() {
        return (
            <div id="image-editor">
                <div id="image-editor__box">
                    <div id="image-editor__preview">
                        <img src="http://hl.hamiltonlane.com/l/187842/2018-02-09/6ybl3/187842/22850/Market_Insights_Q4_2017.png" />
                    </div>
                    <div id="image-editor__settings">
                        <div id="image-editor__settings__inputs">
                            <div id="image-editor__src">
                                <label htmlFor="src">Image Source:</label>
                                <input
                                type="url"
                                id="src"
                                value={this.state.src}
                                placeholder="Enter the URL of the image you wish to display."
                                onChange={this.handleChange}
                                />
                                <button id="image-editor__src__image-database-button">
                                    Browse
                                </button>
                            </div>
                            <div id="image-editor__alt">
                                <label htmlFor="alt">Alt Text:</label>
                                <input
                                type="text"
                                id="alt"
                                value={this.state.alt}
                                placeholder="Enter the text to display if images are disabled."
                                onChange={this.handleChange}
                                />
                            </div>
                            <div id="image-editor__url">
                                <label htmlFor="url">Link URL:</label>
                                <input
                                type="url"
                                id="url"
                                value={this.state.url}
                                placeholder="Enter the URL this image will lead to. Leave blank if it is not linked to anything."
                                onChange={this.handleChange}
                                />
                            </div>
                        </div>
                        <ul
                        id="image-bank"
                        ref={input => {this.bank = input}}
                        dangerouslySetInnerHTML={{__html: this.props.bank}}
                        />
                        <div id="image-editor__settings__buttons">
                            <button id="image-editor__cancel">
                                Cancel
                            </button>
                            <button id="image-editor__done">
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ImageEditor;