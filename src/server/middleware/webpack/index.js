/* eslint-disable import/no-extraneous-dependencies */
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import webpackDevConfig from '../../../config/webpack.config.dev';

const webpackMiddleware = () => {
  const webpackBundler = webpack(webpackDevConfig);

  return [
    webpackDevMiddleware(webpackBundler, {
      noInfo: true,
      publicPath: webpackDevConfig.output.publicPath,
    }),
    webpackHotMiddleware(webpackBundler),
  ];
};

export default webpackMiddleware;
