import Helmet from 'react-helmet';
import { createServerRenderContext } from 'react-router';
import serialize from 'serialize-javascript';

import { IS_DEV } from '../../../config/environment';
import renderApp from './renderApp';
import runRouteTasks from './runRouteTasks';

const handleRoute = (response, status, html, initialState) => {
  const bundlePublicPath = IS_DEV ? '/dev' : '';

  response
    .status(status)
    .render('index', {
      helmet: Helmet.rewind(),
      root: html,
      initialState: serialize(initialState),
      bundleSrc: `${bundlePublicPath}/client/bundle.js`,
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
      const htmlWithNewContext = renderApp(request, context);

      handleRoute(response, 200, htmlWithNewContext, initialState);
    } else {
      handleRoute(response, 400, html, initialState);
    }
  });
};

export default routingMiddleware;
