import validationRequest from '../../middleware/validateRequest';
import express from 'express';
// import { ENUM_USER_ROLE } from '../../../enums/user';
import { admin_Controller } from './controller';
import { adminValidation } from './validation';

const router = express.Router();

router.get(
  '/:id',
  //   auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  admin_Controller.getSingleAdmin
);

router.get(
  '/',
  //   auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  admin_Controller.getAllAdmins
);

router.patch(
  '/:id',
  validationRequest(adminValidation.updateAdmin),
  //   auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  admin_Controller.updateAdmin
);

router.delete(
  '/:id',
  //   auth(ENUM_USER_ROLE.SUPER_ADMIN),
  admin_Controller.deleteAdmin
);

export const adminRoutes = router;
