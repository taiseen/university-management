import validationRequest from '../../middleware/validateRequest';
import express from 'express';
// import { ENUM_USER_ROLE } from '../../../enums/user';
import { authValidation } from './validation';
import { authController } from './controller';

const router = express.Router();

const path = {
  login: '/login',
  refreshToken: '/refresh-token',
  changePassword: '/change-password',
};

router.post(
  path.login,
  validationRequest(authValidation.loginZodSchema),
  authController.loginUser
);

// router.post(
//   path.refreshToken,
//   validationRequest(authValidation.refreshTokenZodSchema),
//   authController.refreshToken
// );

// router.post(
//   path.changePassword,
//   validationRequest(authValidation.changePasswordZodSchema),
//   //   auth(
//   //     ENUM_USER_ROLE.SUPER_ADMIN,
//   //     ENUM_USER_ROLE.ADMIN,
//   //     ENUM_USER_ROLE.FACULTY,
//   //     ENUM_USER_ROLE.STUDENT
//   //   ),
//   authController.changePassword
// );

export const authRoutes = router;
