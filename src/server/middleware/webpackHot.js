import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

const webpackHot = (webpackConfig, webpackBundler) => (
  [
    webpackDevMiddleware(webpackBundler, {
      publicPath: webpackConfig.output.publicPath,
    }),
    webpackHotMiddleware(webpackBundler),
  ]
);

export default webpackHot;
