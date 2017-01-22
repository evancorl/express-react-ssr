import { createServerRenderContext } from 'react-router';

import { IS_DEV } from '../../../config/environment';
import renderApp from './renderApp';
import runRouteTasks from './runRouteTasks';

const handleRoute = (response, status, html) => {
  response
    .status(status)
    .render('index', {
      root: html,
      bundleSrc: IS_DEV ? '/dev/client/index.js' : '/client/index.js',
    });
};

const handleRedirect = (response, { pathname, search }) => {
  response.redirect(302, pathname + search);
};

const routingMiddleware = (request, response) => {
  runRouteTasks(request).then(() => {
    const context = createServerRenderContext();
    const html = renderApp(request, context);

    const { redirect, missed } = context.getResult();

    if (redirect) {
      handleRedirect(response, redirect);
    } else if (missed) {
      handleRoute(response, 200, html);
    } else {
      handleRoute(response, 400, html);
    }
  });
};

export default routingMiddleware;
