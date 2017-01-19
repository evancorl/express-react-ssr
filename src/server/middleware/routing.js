import React from 'react';
import { renderToString } from 'react-dom/server';
import { ServerRouter, createServerRenderContext } from 'react-router';

import App from '../../client/App';

const routing = (request, response) => {
  const context = createServerRenderContext();

  let html = renderToString(
    <ServerRouter
      location={request.url}
      context={context}
    >
      <App />
    </ServerRouter>
  );

  const result = context.getResult();

  if (result.redirect) {
    response.writeHead(301, {
      Location: result.redirect.pathname,
    });

    response.end();
  } else {
    if (result.missed) {
      response.writeHead(404);

      html = renderToString(
        <ServerRouter
          location={request.url}
          context={context}
        >
          <App />
        </ServerRouter>
      );
    }

    response.write(html);
    response.end();
  }
};

export default routing;
