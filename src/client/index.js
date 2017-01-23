import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router';

import App from './components/App';

const reactRoot = document.getElementById('react-root');

render(
  <BrowserRouter>
    <App {...window.INITIAL_STATE} />
  </BrowserRouter>,
  reactRoot);

if (module.hot) {
  module.hot.accept();
}
