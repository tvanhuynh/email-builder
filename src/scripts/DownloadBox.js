import React, { Component } from 'react';

class DownloadBox extends Component {

    state = {
        download: false,
    }

    componentDidUpdate() {
        if (this.codeToCopy) this.codeToCopy.value = "<!DOCTYPE html>\n" + this.documentCloneFinished.documentElement.outerHTML;
    }

    createFiles = () => {
        this.documentClone = document.cloneNode(true);

        this.documentClone.querySelectorAll('style').forEach(i => {
            if (!i.classList.contains('user-style')) {
                i.remove();
            }
        })

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

        // remove titles
        this.documentClone.querySelectorAll('img').forEach(i => i.setAttribute('title', ''));

        this.documentCloneFinished = this.documentClone.cloneNode(true);

        // remove classes
        this.documentCloneFinished.querySelectorAll('.block').forEach(i => i.classList.remove('block'));
        this.documentCloneFinished.querySelectorAll('.footer-block').forEach(i => i.classList.remove('footer-block'));
        this.documentCloneFinished.querySelectorAll('.header-block').forEach(i => i.classList.remove('header-block'));
        this.documentCloneFinished.querySelectorAll('.mandatory').forEach(i => i.classList.remove('mandatory'));
        this.documentCloneFinished.querySelectorAll('.editable').forEach(i => i.classList.remove('editable'));
        this.documentCloneFinished.querySelectorAll('.editable-fixed').forEach(i => i.classList.remove('editable-fixed'));
        this.documentCloneFinished.querySelectorAll('.fixed-width').forEach(i => i.classList.remove('fixed-width'));
        this.documentCloneFinished.querySelectorAll('.clearable').forEach(i => i.classList.remove('clearable'));
        this.documentCloneFinished.querySelectorAll('.removable').forEach(i => i.classList.remove('removable'));
        this.documentCloneFinished.querySelectorAll('.repeatable').forEach(i => i.classList.remove('repeatable'));
        this.documentCloneFinished.querySelectorAll('.user-style').forEach(i => i.classList.remove('user-style'));

        // delete cleared/removables
        this.documentCloneFinished.querySelectorAll('.clearable-undo').forEach(i => {
            while(i.firstChild) {
                i.firstChild.remove();
            }
            i.classList.remove('clearable-undo');
        });
        this.documentCloneFinished.querySelectorAll('.removable-undo').forEach(i => i.remove());
    }

    makeVisible = () => {
        this.createFiles();
        this.setState({download: true});
    }

    downloadSetUp = (filename, text) => {
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

    downloadFile = () => {
        this.downloadSetUp('New-Email-File.html', "<!DOCTYPE html>\n" + this.documentClone.documentElement.outerHTML);
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
                            onClick={this.downloadFile}
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