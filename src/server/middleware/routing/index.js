import { createServerRenderContext } from 'react-router';

import { IS_DEV } from '../../../config/environment';
import renderApp from './renderApp';
import runRouteTasks from './runRouteTasks';

const handleRoute = (response, html) => {
  response
    .status(200)
    .render('index', {
      root: html,
      bundleSrc: IS_DEV ? '/dev/client/index.js' : '/client/index.js',
    });
};

const handleRedirect = (response, { pathname, search }) => {
  response.redirect(302, pathname + search);
};

const handleMissed = (request, response, context) => {
  const htmlWithNewContext = renderApp(request, context);

  response
    .status(404)
    .send(htmlWithNewContext);
};

const routingMiddleware = (request, response) => {
  runRouteTasks(request).then(() => {
    const context = createServerRenderContext();
    const html = renderApp(request, context);

    const { redirect, missed } = context.getResult();

    if (redirect) {
      handleRedirect(response, redirect);
    } else if (missed) {
      handleMissed(request, response, context);
    } else {
      handleRoute(response, html);
    }
  });
};

export default routingMiddleware;
