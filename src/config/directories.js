import { resolve } from 'path';

const directories = {
  src: resolve(__dirname, '..'),
  views: resolve(__dirname, '../views'),
  public: resolve(__dirname, '../../public'),
  build: resolve(__dirname, '../../public/build'),
  static: resolve(__dirname, '../../public/static'),
};

export default directories;

