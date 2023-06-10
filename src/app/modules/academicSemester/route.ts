import { academicSemesterValidation } from './validation';
import { academicSemesterController } from './controller';
import validationRequest from '../../middleware/validateRequest';
import express from 'express';

const router = express.Router();

const path = {
  createSemester: '/create-semester',
};

router.post(
  path.createSemester,
  validationRequest(academicSemesterValidation.createAcademicSemesterZodSchema),
  academicSemesterController.newSemesterCreate
);

export const academicSemesterRoutes = router;
