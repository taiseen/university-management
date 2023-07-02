import validationRequest from '../../middleware/validateRequest';
import express from 'express';
import { studentValidation } from './validation';
import { studentController } from './controller';

const router = express.Router();

const path = {
  deleteStudent: '/:id',
  updateStudent: '/:id',
  singleStudent: '/:id',
  allStudent: '/',
};

// this router operation orders are very important...

router.patch(
  path.updateStudent,
  validationRequest(studentValidation.update_Student_ZodSchema),
  studentController.updateStudent
);

router.delete(path.deleteStudent, studentController.deleteStudent);

router.get(path.singleStudent, studentController.getSingleStudent);

router.get(path.allStudent, studentController.getAllStudent);

export const studentRoutes = router;
