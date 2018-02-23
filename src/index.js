import "medium-editor/dist/css/medium-editor.min.css";
import "medium-editor/dist/css/themes/flat.min.css";
import React from 'react';
import ReactDOM from 'react-dom';
import EmailBuilder from './scripts/EmailBuilder';
import registerServiceWorker from './scripts/registerServiceWorker';

ReactDOM.render(<EmailBuilder />, document.getElementById('email-body'));
registerServiceWorker();