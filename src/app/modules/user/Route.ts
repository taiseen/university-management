import validationRequest from '../../middleware/validateRequest';
import express from 'express';
import { userController } from './Controller';
import { userValidation } from './validation';

const router = express.Router();

const createUserPath = '/create-user';

router.post(
  createUserPath,
  validationRequest(userValidation.userCreateZodSchema),
  userController.newUserCreate
);

export const userRoutes = router;
