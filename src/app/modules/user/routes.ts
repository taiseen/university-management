import validationRequest from '../../middleware/validateRequest';
import express from 'express';
import { userController } from './controller';
import { userValidation } from './validation';

const router = express.Router();

const path = {
  createStudent: '/create-student',
  createFaculty: '/create-faculty',
  createAdmin: '/create-admin',
};

// create student --> user
router.post(
  path.createStudent,
  validationRequest(userValidation.userCreateZodSchema),
  userController.createStudent
);

// create faculty --> user
router.post(
  path.createFaculty,
  validationRequest(userValidation.createFacultyZodSchema),
  userController.createFaculty
);

// create admin --> user
// router.post(
//   path.createAdmin,
//   validationRequest(userValidation.createAdminZodSchema),
//   userController.createAdmin
// );

export const userRoutes = router;
