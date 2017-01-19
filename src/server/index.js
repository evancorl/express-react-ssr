import express from 'express';
import { join } from 'path';
import webpack from 'webpack';

import { isDev } from '../config/environment';
import webpackHot from './middleware/webpackHot';
import webpackDevConfig from '../../webpack.config.dev';
import webpackProdConfig from '../../webpack.config.prod';

const webpackConfig = isDev ? webpackDevConfig : webpackProdConfig;
const webpackBundler = webpack(webpackConfig);

const app = express();

if (isDev) {
  app.use(webpackHot(webpackConfig, webpackBundler));
}

app.get('*', (request, response) => {
  response.sendFile(join(__dirname, '../views/index.html'));
});

app.listen(3000, () => {
  console.log('Listening at http://localhost:3000/');
});
