import express from 'express';
import webpack from 'webpack';

import { isDev } from './config/environment';
import webpackMiddleware from './server/middleware/webpack';
import routingMiddleware from './server/middleware/routing';
import webpackDevConfig from './config/webpack.dev';
import webpackProdConfig from './config/webpack.prod';

const webpackConfig = isDev ? webpackDevConfig : webpackProdConfig;
const webpackBundler = webpack(webpackConfig);

const app = express();

if (isDev) {
  app.use(webpackMiddleware(webpackConfig, webpackBundler));
}

app.use(routingMiddleware);

app.listen(3000, () => {
  console.log('Listening at http://localhost:3000/');
});
