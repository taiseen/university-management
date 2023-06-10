import { userValidation } from '../../middleware/validateRequest';
import { userController } from './Controller';
import validationRequest from './validation';
import express from 'express';

const router = express.Router();

const createUserPath = '/create-user';

router.post(
  createUserPath,
  validationRequest(userValidation.userCreateZodSchema),
  userController.newUserCreate
);

export const userRoutes = router;
