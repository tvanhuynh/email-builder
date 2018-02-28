import React, { Component } from 'react';

class DownloadBox extends Component {

    render() {
        return (
            <div id="download-box" className="editor destroy">
                <div className="editor__box">
                    <span id="download-box__code__title">Copy the code below into your email service.</span>
                    <textarea id="download-box__code">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean semper aliquet diam, id dictum dui blandit vitae. Etiam ut neque justo. Proin auctor, magna non scelerisque rutrum, diam quam ullamcorper sem, non interdum ligula orci eget dolor. Pellentesque id diam nulla. Etiam pulvinar orci ullamcorper consectetur blandit. Morbi in volutpat nisi, in suscipit metus. Vivamus non tortor eros. Integer tristique elementum congue. Nunc rutrum dapibus iaculis. Etiam consequat enim non turpis convallis, eget suscipit velit sodales. Proin sagittis felis vitae aliquam suscipit. Aliquam ac dui dignissim, pulvinar enim vitae, semper ex.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean semper aliquet diam, id dictum dui blandit vitae. Etiam ut neque justo. Proin auctor, magna non scelerisque rutrum, diam quam ullamcorper sem, non interdum ligula orci eget dolor. Pellentesque id diam nulla. Etiam pulvinar orci ullamcorper consectetur blandit. Morbi in volutpat nisi, in suscipit metus. Vivamus non tortor eros. Integer tristique elementum congue. Nunc rutrum dapibus iaculis. Etiam consequat enim non turpis convallis, eget suscipit velit sodales. Proin sagittis felis vitae aliquam suscipit. Aliquam ac dui dignissim, pulvinar enim vitae, semper ex.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean semper aliquet diam, id dictum dui blandit vitae. Etiam ut neque justo. Proin auctor, magna non scelerisque rutrum, diam quam ullamcorper sem, non interdum ligula orci eget dolor. Pellentesque id diam nulla. Etiam pulvinar orci ullamcorper consectetur blandit. Morbi in volutpat nisi, in suscipit metus. Vivamus non tortor eros. Integer tristique elementum congue. Nunc rutrum dapibus iaculis. Etiam consequat enim non turpis convallis, eget suscipit velit sodales. Proin sagittis felis vitae aliquam suscipit. Aliquam ac dui dignissim, pulvinar enim vitae, semper ex.
                    </textarea>
                    <div className="editor__buttons-row">
                        <button class="button background--orange text--white" id="download-box__button">Download the email locally.</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default DownloadBox;