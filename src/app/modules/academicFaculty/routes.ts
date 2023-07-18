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

const { SUPER_ADMIN, ADMIN, FACULTY, STUDENT } = ENUM_USER_ROLE;

router.post(
  path.createFaculty,
  validationRequest(aF_Validation.create_AF_ZodSchema), // user input checking
  auth(SUPER_ADMIN, ADMIN), // access permission
  aF_Controller.createFaculty
);

// this router operation orders are very important...

router.patch(
  path.updateFaculty,
  validationRequest(aF_Validation.update_AF_ZodSchema),
  auth(SUPER_ADMIN, ADMIN, FACULTY), // access permission
  aF_Controller.updateFaculty
);

router.delete(
  path.deleteFaculty,
  auth(SUPER_ADMIN, ADMIN), // access permission
  aF_Controller.deleteFaculty
);

router.get(path.singleFaculty, aF_Controller.getSingleFaculty);

router.get(
  path.allFaculty,
  auth(SUPER_ADMIN, ADMIN, FACULTY, STUDENT), // access permission
  aF_Controller.getAllFaculty
);

export const aF_Routes = router;
