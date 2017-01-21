import webpack from 'webpack';
import merge from 'webpack-merge';

import webpackDefaultConfig from './webpack.default';

const webpackDevConfig = merge(webpackDefaultConfig, {
  devtool: 'eval',
  entry: [
    'webpack-hot-middleware/client',
  ],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
});

export default webpackDevConfig;
