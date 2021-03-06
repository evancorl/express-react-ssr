import { join } from 'path';
import webpack from 'webpack';

import directories from './directories';

const webpackDefaultConfig = {
  entry: [
    'babel-polyfill',
    join(directories.src, 'client/index.js'),
  ],
  output: {
    filename: 'client/bundle.js',
    path: directories.public,
    publicPath: '/public',
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
  ],
  module: {
    preLoaders: [{
      test: /\.jsx?$/,
      loader: 'eslint-loader',
      exclude: /node_modules/,
      include: directories.src,
    }],
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
        include: directories.src,
      },
    ],
  },
  resolve: {
    root: directories.src,
    extensions: ['', '.js', '.jsx', '.json'],
  },
};

export default webpackDefaultConfig;
