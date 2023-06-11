import { sendResponse } from '../../../shared/sendResponse';
import { Request, Response, NextFunction } from 'express';
import { AcademicSemesterService } from './service';
import catchAsync from '../../../shared/catchAsync';
import httpStatus from 'http-status';

// Higher Order Function (HOF) - use here... for reduce code duplication
const newSemesterCreate = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body;

    const result = await AcademicSemesterService.createSemester(
      academicSemesterData
    );

    const responseData = {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic semester created successfully',
      data: result,
    };

    sendResponse(res, responseData);

    next();
  }
);

export const academicSemesterController = {
  newSemesterCreate,
};
