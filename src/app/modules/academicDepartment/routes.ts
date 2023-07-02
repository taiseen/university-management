import validationRequest from '../../middleware/validateRequest';
import express from 'express';
import { aD_Validation } from './validation';
import { aD_Controller } from './controller';

const router = express.Router();

const path = {
  createDepartment: '/',
  updateDepartment: '/:id',
  deleteDepartment: '/:id',
  singleDepartment: '/:id',
  allDepartment: '/',
};

router.post(
  path.createDepartment,
  validationRequest(aD_Validation.create_AD_ZodSchema),
  aD_Controller.createDepartment
);

// this router operation orders are very important...

router.patch(
  path.updateDepartment,
  validationRequest(aD_Validation.update_AD_ZodSchema),
  aD_Controller.updateDepartment
);

router.delete(path.deleteDepartment, aD_Controller.deleteDepartment);

router.get(path.singleDepartment, aD_Controller.getSingleDepartment);

router.get(path.allDepartment, aD_Controller.getAllDepartment);

export const aD_Routes = router;
