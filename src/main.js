if (!window.Promise) {
  window.Promise = require('promise-polyfill');
}

if (!window.fetch) {
  require('whatwg-fetch');
}

if (!Object.assign) {
  Object.assign = require('object-assign');
}

import ReactDOM from 'react-dom';
import App from 'App';

const container = document.querySelector('#app');

ReactDOM.render(<App />, container);
