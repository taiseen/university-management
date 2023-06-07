import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(process.cwd(), '.env'),
});

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  dbURL: process.env.DATABASE_URL,
  defaultUserPass: process.env.DEFAULT_USER_PASS,
};
