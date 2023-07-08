import validationRequest from '../../middleware/validateRequest';
import express from 'express';
// import { ENUM_USER_ROLE } from '../../../enums/user';
import { MD_Validation } from './validation';
import { mD_Controller } from './controller';

const router = express.Router();

const path = {
  createDepartment: '/create-department',
  deleteDepartment: '/:id',
  updateDepartment: '/:id',
  getSingleDepartment: '/:id',
  getAllDepartments: '/',
};

router.post(
  path.createDepartment,
  validationRequest(MD_Validation.create_MD_ZodSchema),
  //   auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  mD_Controller.createDepartment
);

router.get(
  path.getSingleDepartment,
  //   auth(
  //     ENUM_USER_ROLE.SUPER_ADMIN,
  //     ENUM_USER_ROLE.ADMIN,
  //     ENUM_USER_ROLE.FACULTY,
  //     ENUM_USER_ROLE.STUDENT
  //   ),
  mD_Controller.getSingleDepartment
);

router.patch(
  path.updateDepartment,
  validationRequest(MD_Validation.update_MD_ZodSchema),
  //   auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  mD_Controller.updateDepartment
);

router.delete(
  path.deleteDepartment,
  //   auth(ENUM_USER_ROLE.SUPER_ADMIN),
  mD_Controller.deleteDepartment
);

router.get(
  path.getAllDepartments,
  //   auth(
  //     ENUM_USER_ROLE.SUPER_ADMIN,
  //     ENUM_USER_ROLE.ADMIN,
  //     ENUM_USER_ROLE.FACULTY,
  //     ENUM_USER_ROLE.FACULTY,
  //     ENUM_USER_ROLE.STUDENT
  //   ),
  mD_Controller.getAllDepartments
);

export const mD_Routes = router;
