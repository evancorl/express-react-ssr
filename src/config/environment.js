import dotenv from 'dotenv';

dotenv.config({ path: '.env', silent: true });

export const isDev = process.env.NODE_ENV !== 'production';

export default {
  ...process.env,
  isDev,
};
