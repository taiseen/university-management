import { sendResponse } from '../../../shared/sendResponse';
import { Request, Response, NextFunction } from 'express';
import { paginationFields } from '../../../constants';
import { aS_FilterableFields } from './constants';
import { aS_Service } from './service';
import { TAS } from './interface';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import httpStatus from 'http-status';

// 🟨🟨🟨🟨🟨🟨🟨🟨🟨
// academicSemester == aS
// 🟨🟨🟨🟨🟨🟨🟨🟨🟨

// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩

// Higher Order Function (HOF) - use here... for reduce code duplication

const newSemesterCreate = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...aS_Data } = req.body;

    const result = await aS_Service.createSemester(aS_Data);

    const responseData = {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic semester created successfully',
      data: result,
    };

    sendResponse<TAS>(res, responseData);

    next();
  }
);

// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
const getAllSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const filters = pick(req.query, aS_FilterableFields);

    const paginationOptions = pick(req.query, paginationFields);

    const result = await aS_Service.getAllSemester(filters, paginationOptions);

    sendResponse<TAS[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semesters retrieved successfully',
      meta: result.meta,
      data: result.data,
    });

    next();
  }
);

// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
const getSingleSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const result = await aS_Service.getSingleSemester(id);

    sendResponse<TAS>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester retrieved successfully',
      data: result,
    });

    next();
  }
);

export const aS_Controller = {
  newSemesterCreate,
  getAllSemester,
  getSingleSemester,
};
