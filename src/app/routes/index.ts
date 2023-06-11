import { academicSemesterRoutes } from '../modules/academicSemester/route';
import { userRoutes } from '../modules/user/Route';
import express from 'express';

const router = express.Router();

const apiRoutes = [
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/academic-semesters',
    route: academicSemesterRoutes,
  },
];

apiRoutes.forEach(({ path, route }) => router.use(path, route));

export default router;
