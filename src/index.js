import express from 'express';
import webpack from 'webpack';

import { IS_DEV, PORT } from './config/environment';
import webpackMiddleware from './server/middleware/webpack';
import routingMiddleware from './server/middleware/routing';
import webpackDevConfig from './config/webpack.dev';
import webpackProdConfig from './config/webpack.prod';

const webpackConfig = IS_DEV ? webpackDevConfig : webpackProdConfig;
const webpackBundler = webpack(webpackConfig);

const app = express();

if (IS_DEV) {
  app.use(webpackMiddleware(webpackConfig, webpackBundler));
}

app.use(routingMiddleware);

const server = app.listen(PORT || 3000, () => {
  const { port } = server.address();

  console.log(`Server is now running on port ${port}.`);
});
