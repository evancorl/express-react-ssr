import express from 'express';

import { IS_DEV, PORT } from './config/environment';
import routingMiddleware from './server/middleware/routing';
import webpackMiddleware from './server/middleware/webpack';

const app = express();

if (IS_DEV) {
  app.use(webpackMiddleware());
}

app.use(routingMiddleware);

const server = app.listen(PORT || 3000, () => {
  const { port } = server.address();

  console.log(`Server is now running on port ${port}.`);
});
