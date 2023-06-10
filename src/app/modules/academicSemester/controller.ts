import { AcademicSemesterService } from './service';
import { sendResponse } from '../sendResponse';
import { RequestHandler } from 'express';

const newSemesterCreate: RequestHandler = async (req, res, next) => {
  try {
    const { ...academicSemesterData } = req.body;

    const result = await AcademicSemesterService.createSemester(
      academicSemesterData
    );

    sendResponse(res, 200, 'Academic semester created successfully', result);
  } catch (error) {
    next(error);
  }
};

export const academicSemesterController = {
  newSemesterCreate,
};
