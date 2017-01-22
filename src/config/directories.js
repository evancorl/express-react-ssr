import { resolve } from 'path';

const directories = {
  src: resolve(__dirname, '..'),
  public: resolve(__dirname, '../../public'),
  views: resolve(__dirname, '../../views'),
};

export default directories;
