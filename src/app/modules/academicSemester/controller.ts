import { sendResponse } from '../../../shared/sendResponse';
import { Request, Response, NextFunction } from 'express';
import { paginationFields } from '../../../constants';
import { AcademicSemesterService } from './service';
import { TAcademicSemester } from './interface';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
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

    sendResponse<TAcademicSemester>(res, responseData);

    next();
  }
);

const getAllSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const paginationOptions = pick(req.query, paginationFields);

    const result = await AcademicSemesterService.getAllSemesters(
      paginationOptions
    );

    sendResponse<TAcademicSemester[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester retrieved successfully',
      meta: result.meta,
      data: result.data,
    });

    next();
  }
);

export const academicSemesterController = {
  newSemesterCreate,
  getAllSemester,
};
