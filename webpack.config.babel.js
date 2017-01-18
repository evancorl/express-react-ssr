import { join } from 'path';
import webpack from 'webpack';

const webpackConfig = {
  entry: [
    'webpack-hot-middleware/client',
    join(__dirname, 'src/client/index.js'),
  ],
  output: {
    filename: 'bundle.js',
    path: join(__dirname, 'public'),
    publicPath: '/public/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    preLoaders: [{
      test: /\.jsx?$/,
      loader: 'eslint-loader',
      exclude: /node_modules/,
      include: join(__dirname, 'src'),
    }],
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel-loader'],
        include: join(__dirname, 'src'),
      },
    ],
  },
  resolve: {
    root: join(__dirname, 'src'),
    extensions: ['', '.js', '.jsx', '.json'],
  },
};

export default webpackConfig;
