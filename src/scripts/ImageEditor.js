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
        isFixedWidth: false,
    }

    constructor(props) {
        super(props);

        this.bank = document.createElement('ul');
        if (this.props.bank) {
            this.bank.innerHTML = this.props.bank;
        }
    }

    componentDidUpdate() {
        if (this.state.target) {
            document.getElementById('editor__image__settings__bank').querySelectorAll('li').forEach(i => {
                if(!i.children.length) {
                    let src = i.innerHTML;
                    i.style.backgroundImage = `url('${src}')`;
                    i.onclick = () => {
                        this.setState({src: src});
                        if (this.state.isFixedWidth) {
                            let img = new Image();
                            img.src = src;
                            let ratio = img.height / img.width;
                            this.setState({height: this.state.width * ratio});
                            console.log('fixed width');
                        } else if (!this.state.isFixed) {
                            let img = new Image();
                            img.src = src;
                            this.setState({height: img.height, width: img.width});
                        }
                    };
                }
            })

            if (!document.getElementById('editor__image__settings__bank').hasChildNodes()) {
                document.getElementById('editor__image__settings__bank').style.opacity = 0;
            } else {
                document.getElementById('editor__image__settings__bank').style.opacity = 1;
            }
            this.calculateWidth();
        }
    }

    handleChange = event => {
        if (event.target.id === 'editor__image__settings__input__src') {
            this.setState({src: event.target.value});
            if (this.state.isFixedWidth) {
                let img = new Image();
                img.src = event.target.value;
                let ratio = img.height / img.width;
                this.setState({height: this.state.width * ratio});
                console.log('fixed width');
            } else if (!this.state.isFixed) {
                let img = new Image();
                img.src = event.target.value;
                this.setState({height: img.height, width: img.width});
            }
        } else if (event.target.id === 'editor__image__settings__input__alt') {
            this.setState({alt: event.target.value});
        } else if (event.target.id === 'editor__image__settings__input__url') {
            this.setState({url: event.target.value});
        }
    }

    updateTarget = target => {
        this.setState({
            target: target,
            isFixed: target.classList.contains('editable-fixed'),
            src: target.getAttribute('src'),
            height: target.height,
            width: target.width,
            alt: target.getAttribute('alt') || '',
            url: target.parentNode.getAttribute('href') || '',
            isFixedWidth: target.classList.contains('fixed-width'),
        });
    }

    updateImage = () => {
        let target = this.state.target;
        target.setAttribute('src', this.state.src);
        target.setAttribute('alt', this.state.alt);
        target.setAttribute('height', this.state.height);
        target.setAttribute('width', this.state.width);

        if (target.parentNode.tagName === "A") { // has <a> wrapped around it
            if (this.state.url.length) { // is a link
                target.parentNode.setAttribute('href', this.state.url);
            } else { // is not a link
                let a = target.parentNode;
                a.parentNode.insertBefore(target, a);
                a.remove();
            }
        } else { // doesn't have <a> wrapped around
            if (this.state.url.length) { // is a link
                let a = document.createElement('a');
                a.setAttribute('href', this.state.url);
                target.parentNode.insertBefore(a, target);
                a.appendChild(target);
            }
        }

        this.setState({target: null});
    }

    calculateWidth = () => {
        let width = document.getElementById('editor__image__preview').offsetWidth - 40 - 2;
        let height = document.getElementById('editor__image__preview').offsetHeight - 40 - 2;
        let ratio = this.state.height / this.state.width;
        let previewImage = document.getElementById('editor__image__preview__image');

        if (this.state.width > this.state.height) {
            previewImage.style.width = this.state.width > width ? width + 'px' : this.state.width + 'px';
            previewImage.style.height = this.state.width > width ? ratio * width + 'px' : this.state.height + 'px';
        } else {
            previewImage.style.width = this.state.height > height ? 1 / ratio * height + 'px' : this.state.width + 'px';
            previewImage.style.height = this.state.height > height ? height + 'px' : this.state.height + 'px';
        }

    }

    render() {
        if (this.state.target === null) {
            return (null)
        } else {
        return (
                <div className="editor destroy">
                    <div id="editor__image__box" className="editor__box">
                        <div id="editor__image__preview">
                            <img alt={this.state.alt} src={this.state.src} height="auto" id="editor__image__preview__image" />
                            <div id="editor__image__preview__dimensions">{this.state.height} x {this.state.width}</div>
                        </div>
                        <div id="editor__image__settings">
                            <div id="editor__image__settings__inputs">
                                <div className="input-container__text-line">
                                    <label htmlFor="editor__image__settings__input__src">Image Source:</label>
                                    <input
                                    type="url"
                                    id="editor__image__settings__input__src"
                                    value={this.state.src}
                                    placeholder="Enter the URL of the image you wish to display."
                                    onChange={this.handleChange}
                                    />
                                    <button id="editor__image__src__image-database-button">
                                        Browse
                                    </button>
                                </div>
                                <div className="input-container__text-line">
                                    <label htmlFor="editor__image__settings__input__alt">Alt Text:</label>
                                    <input
                                    type="text"
                                    id="editor__image__settings__input__alt"
                                    value={this.state.alt}
                                    placeholder="Enter the text to display if images are disabled."
                                    onChange={this.handleChange}
                                    />
                                </div>
                                <div className="input-container__text-line">
                                    <label htmlFor="editor__image__settings__input__url">Link URL:</label>
                                    <input
                                    type="url"
                                    id="editor__image__settings__input__url"
                                    value={this.state.url}
                                    placeholder="Enter the URL this image will lead to. Leave blank if it is not linked to anything."
                                    onChange={this.handleChange}
                                    />
                                </div>
                            </div>
                            <ul
                            id="editor__image__settings__bank"
                            // ref={input => this.bankRef = input}
                            dangerouslySetInnerHTML={{__html: this.bank.innerHTML}}
                            />
                            <div className="editor__buttons-row">
                                <button
                                className="button background--gray"
                                onClick={() => this.setState({target: null})}
                                >
                                    Cancel
                                </button>
                                <button
                                className="button background--blue text--white"
                                onClick={this.updateImage}
                                >
                                    Done
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default ImageEditor;