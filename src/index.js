import express from 'express';

import directories from './config/directories';
import { IS_DEV, PORT } from './config/environment';
import routingMiddleware from './server/middleware/routing';
import webpackMiddleware from './server/middleware/webpack';

const app = express();

if (IS_DEV) {
  app.use(webpackMiddleware());
}

app
  .set('view engine', 'ejs')
  .set('views', directories.views);

app
  .use(express.static('public'))
  .use(routingMiddleware);

const server = app.listen(PORT || 3000, () => {
  const { port } = server.address();

  console.log(`Server is now running on port ${port}.`);
});
