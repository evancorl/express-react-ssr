import webpack from 'webpack';
import merge from 'webpack-merge';

import webpackDefaultConfig from './webpack.config.default';

const webpackProdConfig = merge(webpackDefaultConfig, {
  bail: true,
  devtool: 'source-map',
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      dropDebugger: true,
      dropConsole: true,
      compressor: {
        warnings: false,
      },
    }),
  ],
});

export default webpackProdConfig;
