import React from 'react';
import { renderToString } from 'react-dom/server';
import { ServerRouter } from 'react-router';

import App from '../../../client/components/App';

const renderApp = ({ url }, context, initialState) => {
  const html = renderToString(
    <ServerRouter
      location={url}
      context={context}
    >
      <App {...initialState} />
    </ServerRouter>);

  return html;
};

export default renderApp;
