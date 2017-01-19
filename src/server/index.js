import express from 'express';
import webpack from 'webpack';

import { isDev } from '../config/environment';
import webpackHot from './middleware/webpackHot';
import routing from './middleware/routing';
import webpackDevConfig from '../../webpack.config.dev';
import webpackProdConfig from '../../webpack.config.prod';

const webpackConfig = isDev ? webpackDevConfig : webpackProdConfig;
const webpackBundler = webpack(webpackConfig);

const app = express();

if (isDev) {
  app.use(webpackHot(webpackConfig, webpackBundler));
}

app.use(routing);

app.listen(3000, () => {
  console.log('Listening at http://localhost:3000/');
});
