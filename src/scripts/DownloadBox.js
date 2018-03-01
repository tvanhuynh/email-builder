import React, { Component } from 'react';

class DownloadBox extends Component {

    state = {
        download: false,
    }

    componentDidUpdate() {
        this.documentClone = document.cloneNode(true);

        // remove styles
        let styles = this.documentClone.querySelectorAll('style');
        for (let i = 0; i < 5; i++) {
            styles[i].remove();
        }

        // remove medium editors
        this.documentClone.querySelectorAll('.medium-editor-anchor-preview').forEach(i => i.remove());
        this.documentClone.querySelectorAll('.medium-editor-toolbar').forEach(i => i.remove());
        this.documentClone.querySelectorAll('.medium-editor-element').forEach(i => {
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

        // remove all scripts
        this.documentClone.querySelectorAll('script').forEach(i => i.remove());
        this.documentClone.querySelectorAll('noscript').forEach(i => i.remove());

        // destroy elements
        this.documentClone.querySelectorAll('.destroy').forEach(i => i.remove());

        // unwrap elements
        this.documentClone.querySelectorAll('.unwrap').forEach(i => {
            while(i.firstChild) i.parentNode.insertBefore(i.firstChild, i);
            i.remove();
        });

        this.documentCloneFinished = this.documentClone.cloneNode(true);

        // remove classes
        this.documentCloneFinished.querySelectorAll('.block').forEach(i => i.classList.remove('block'));
        this.documentCloneFinished.querySelectorAll('.footer-block').forEach(i => i.classList.remove('footer-block'));
        this.documentCloneFinished.querySelectorAll('.header-block').forEach(i => i.classList.remove('header-block'));
        this.documentCloneFinished.querySelectorAll('.mandatory').forEach(i => i.classList.remove('mandatory'));
        this.documentCloneFinished.querySelectorAll('.editable').forEach(i => i.classList.remove('editable'));
        this.documentCloneFinished.querySelectorAll('.editable-fixed').forEach(i => i.classList.remove('editable-fixed'));
        this.documentCloneFinished.querySelectorAll('.clearable').forEach(i => i.classList.remove('clearable'));
        this.documentCloneFinished.querySelectorAll('.removable').forEach(i => i.classList.remove('removable'));
        this.documentCloneFinished.querySelectorAll('.repeatable').forEach(i => i.classList.remove('repeatable'));
        this.documentCloneFinished.querySelectorAll('.clearable-undo').forEach(i => i.remove());
        this.documentCloneFinished.querySelectorAll('.removable-undo').forEach(i => i.remove());


        if (this.codeToCopy) this.codeToCopy.value = "<!DOCTYPE html>\n" + this.documentCloneFinished.documentElement.outerHTML;
    }

    makeVisible = () => {
        this.setState({download: true});
    }

    download = (filename, text) => {
        var pom = document.createElement('a');
        pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        pom.setAttribute('download', filename);
    
        if (document.createEvent) {
            var event = document.createEvent('MouseEvents');
            event.initEvent('click', true, true);
            pom.dispatchEvent(event);
        }
        else {
            pom.click();
        }
    }

    test = () => {
        this.download('New-Email-File.html', "<!DOCTYPE html>\n" + this.documentClone.documentElement.outerHTML);
    }

    render() {
        if (this.state.download) {
            return (
                <div id="download-box" className="editor destroy">
                    <div className="editor__box">
                        <span id="download-box__code__title">Copy the code below into your email service.</span>
                        <textarea id="download-box__code" readOnly="true" ref={input => {this.codeToCopy = input}} />
                        <div className="editor__buttons-row">
                            <button
                            className="button background--gray"
                            onClick={() => this.setState({download: false})}
                            >
                                Close
                            </button>
                            <button
                            className="button background--orange text--white"
                            id="download-box__button"
                            onClick={this.test}
                            >
                                Download Locally
                            </button>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (null);
        }
    }
}

export default DownloadBox;