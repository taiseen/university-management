import validationRequest from '../../middleware/validateRequest';
import express from 'express';
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

router.post(
  path.createFaculty,
  validationRequest(aF_Validation.create_AF_ZodSchema),
  aF_Controller.createFaculty
);

// this router operation orders are very important...

router.patch(
  path.updateFaculty,
  validationRequest(aF_Validation.update_AF_ZodSchema),
  aF_Controller.updateFaculty
);

router.delete(path.deleteFaculty, aF_Controller.deleteFaculty);

router.get(path.singleFaculty, aF_Controller.getSingleFaculty);

router.get(path.allFaculty, aF_Controller.getAllFaculty);

export const aF_Routes = router;
