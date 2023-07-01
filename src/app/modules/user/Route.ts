import validationRequest from '../../middleware/validateRequest';
import express from 'express';
import { userController } from './controller';
import { userValidation } from './validation';

const router = express.Router();

const createUserPath = '/create-student';

router.post(
  createUserPath,
  validationRequest(userValidation.userCreateZodSchema),
  userController.createStudent
);

export const userRoutes = router;
