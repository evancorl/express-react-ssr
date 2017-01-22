import { createServerRenderContext } from 'react-router';
import serialize from 'serialize-javascript';

import { IS_DEV } from '../../../config/environment';
import renderApp from './renderApp';
import runRouteTasks from './runRouteTasks';

const handleRoute = (response, status, html, initialState) => {
  response
    .status(status)
    .render('index', {
      root: html,
      initialState: serialize(initialState),
      bundleSrc: IS_DEV ? '/dev/client/index.js' : '/client/index.js',
    });
};

const handleRedirect = (response, { pathname, search }) => {
  response.redirect(302, pathname + search);
};

const routingMiddleware = (request, response) => {
  runRouteTasks(request).then((initialState) => {
    const context = createServerRenderContext();
    const html = renderApp(request, context, initialState);

    const { redirect, missed } = context.getResult();

    if (redirect) {
      handleRedirect(response, redirect);
    } else if (missed) {
      handleRoute(response, 200, html, initialState);
    } else {
      handleRoute(response, 400, html, initialState);
    }
  });
};

export default routingMiddleware;
