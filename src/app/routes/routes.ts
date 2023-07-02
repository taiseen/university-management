import { aD_Routes } from '../modules/academicDepartment/routes';
import { aS_Routes } from '../modules/academicSemester/routes';
import { aF_Routes } from '../modules/academicFaculty/routes';
import { studentRoutes } from '../modules/student/routes';
import { userRoutes } from '../modules/user/routes';

const apiRoutes = [
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/academic-semesters',
    route: aS_Routes,
  },
  {
    path: '/academic-faculty',
    route: aF_Routes,
  },
  {
    path: '/academic-department',
    route: aD_Routes,
  },
  {
    path: '/student',
    route: studentRoutes,
  },
];

export default apiRoutes;
