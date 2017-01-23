import webpack from 'webpack';
import merge from 'webpack-merge';

import webpackDefaultConfig from './webpack.config.default';

const webpackDevConfig = merge(webpackDefaultConfig, {
  devtool: 'eval',
  entry: [
    'webpack-hot-middleware/client',
  ],
  output: {
    publicPath: '/dev',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin({
      quiet: true,
    }),
  ],
});

export default webpackDevConfig;
