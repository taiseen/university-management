import validationRequest from '../../middleware/validateRequest';
import express from 'express';
import { aS_Validation } from './validation';
import { aS_Controller } from './controller';

const router = express.Router();

const path = {
  createSemester: '/',
  updateSemester: '/:id',
  deleteSemester: '/:id',
  singleSemester: '/:id',
  allSemester: '/',
};

router.post(
  path.createSemester,
  validationRequest(aS_Validation.create_AS_ZodSchema),
  aS_Controller.newSemesterCreate
);

// this router operation orders are very important...

router.patch(
  path.updateSemester,
  validationRequest(aS_Validation.update_AS_ZodSchema),
  aS_Controller.updateSemester
);

router.delete(path.deleteSemester, aS_Controller.deleteSemester);

router.get(path.singleSemester, aS_Controller.getSingleSemester);

router.get(path.allSemester, aS_Controller.getAllSemester);

export const aS_Routes = router;
