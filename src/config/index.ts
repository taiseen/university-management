import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  dbURL: process.env.DATABASE_URL,

  defaultStudentPass: process.env.DEFAULT_STUDENT_PASS,
  defaultFacultyPass: process.env.DEFAULT_FACULTY_PASS,
  defaultAdminPass: process.env.DEFAULT_ADMIN_PASS,

  bycryptSaltRounds: process.env.BCRYPT_SALT_ROUNDS,

  // jwt: {
  //   secret: process.env.JWT_SECRET,
  //   refreshSecret: process.env.JWT_REFRESH_SECRET,
  //   expiresIn: process.env.JWT_EXPIRES_IN,
  //   refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
  // },
};
