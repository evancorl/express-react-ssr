import express from 'express';
import { join } from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import webpackConfig from '../../webpack.config.babel';

const isDev = process.env.NODE_ENV !== 'production';

const app = express();
const compiler = webpack(webpackConfig);

if (isDev) {
  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
  }));

  app.use(webpackHotMiddleware(compiler));
}

app.get('*', (request, response) => {
  response.sendFile(join(__dirname, '../views/index.html'));
});

app.listen(3000, () => {
  console.log('Listening at http://localhost:3000/');
});
