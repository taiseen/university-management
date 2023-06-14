import validationRequest from '../../middleware/validateRequest';
import express from 'express';
import { aS_Validation } from './validation';
import { aS_Controller } from './controller';

const router = express.Router();

const path = {
  createSemester: '/create-semester',
  singleSemester: '/:id',
  allSemester: '/',
};

router.post(
  path.createSemester,
  validationRequest(aS_Validation.create_AS_ZodSchema),
  aS_Controller.newSemesterCreate
);

router.get(path.singleSemester, aS_Controller.getSingleSemester);

router.get(path.allSemester, aS_Controller.getAllSemester);

export const academicSemesterRoutes = router;
