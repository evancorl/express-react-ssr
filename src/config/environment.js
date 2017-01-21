import dotenv from 'dotenv';

dotenv.config({ path: '.env', silent: true });

export const IS_DEV = process.env.NODE_ENV !== 'production';

export default {
  ...process.env,
  IS_DEV,
};
