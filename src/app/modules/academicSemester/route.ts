import { academicSemesterValidation } from './validation';
import { academicSemesterController } from './controller';
import validationRequest from '../../middleware/validateRequest';
import express from 'express';

const router = express.Router();

const path = {
  createSemester: '/create-semester',
  allSemester: '/all-semester',
};

router.post(
  path.createSemester,
  validationRequest(academicSemesterValidation.createAcademicSemesterZodSchema),
  academicSemesterController.newSemesterCreate
);

router.get(path.allSemester, academicSemesterController.getAllSemester);

export const academicSemesterRoutes = router;
