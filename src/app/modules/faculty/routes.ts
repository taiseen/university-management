import validationRequest from '../../middleware/validateRequest';
import express from 'express';
import { facultyValidation } from './validations';
import { facultyController } from './controller';

const router = express.Router();

const path = {
  deleteFaculty: '/:id',
  updateFaculty: '/:id',
  getSingleFaculty: '/:id',
  getAllFaculties: '/',
};

router.get(path.getSingleFaculty, facultyController.getSingleFaculty);

router.get(path.getAllFaculties, facultyController.getAllFaculties);

router.patch(
  path.updateFaculty,
  validationRequest(facultyValidation.updateFacultyZodSchema),
  facultyController.updateFaculty
);

router.delete(path.deleteFaculty, facultyController.deleteFaculty);

export const facultyRoutes = router;
