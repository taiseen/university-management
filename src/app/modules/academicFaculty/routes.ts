import validationRequest from '../../middleware/validateRequest';
import auth from '../../middleware/auth';
import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { aF_Validation } from './validation';
import { aF_Controller } from './controller';

const router = express.Router();

const path = {
  createFaculty: '/',
  updateFaculty: '/:id',
  deleteFaculty: '/:id',
  singleFaculty: '/:id',
  allFaculty: '/',
};

// const { SUPER_ADMIN, ADMIN, FACULTY, STUDENT } = ENUM_USER_ROLE;

router.post(
  path.createFaculty,
  validationRequest(aF_Validation.create_AF_ZodSchema), // user input checking
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN), // access permission
  aF_Controller.createFaculty
);

// this router operation orders are very important...

router.patch(
  path.updateFaculty,
  validationRequest(aF_Validation.update_AF_ZodSchema),
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY
  ), // access permission
  aF_Controller.updateFaculty
);

router.delete(
  path.deleteFaculty,
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN), // access permission
  aF_Controller.deleteFaculty
);

router.get(path.singleFaculty, aF_Controller.getSingleFaculty);

router.get(
  path.allFaculty,
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT
  ), // access permission
  aF_Controller.getAllFaculty
);

export const aF_Routes = router;
