import "babel-polyfill";
import "drag-drop-polyfill";
import "normalize.css";
import "medium-editor/dist/css/medium-editor.min.css";
import "medium-editor/dist/css/themes/flat.min.css";
import React from 'react';
import ReactDOM from 'react-dom';
import EmailBuilder from './scripts/EmailBuilder';
import registerServiceWorker from './scripts/registerServiceWorker';

if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = function (callback, thisArg) {
      thisArg = thisArg || window;
      for (var i = 0; i < this.length; i++) {
          callback.call(thisArg, this[i], i, this);
      }
  };
}

// from:https://github.com/jserz/js_piece/blob/master/DOM/ChildNode/remove()/remove().md
(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty('remove')) {
      return;
    }
    Object.defineProperty(item, 'remove', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function remove() {
        if (this.parentNode !== null)
          this.parentNode.removeChild(this);
      }
    });
  });
})([Element.prototype, CharacterData.prototype, DocumentType.prototype]);

ReactDOM.render(<EmailBuilder />, document.getElementById('email-body'));

registerServiceWorker();