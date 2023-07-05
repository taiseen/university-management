import { sendResponse } from '../../../shared/sendResponse';
import { paginationFields } from '../../../constants';
import { facultyFilterableFields } from './constant';
import { Request, Response } from 'express';
import { facultyService } from './service';
import { TFaculty } from './interface';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import httpStatus from 'http-status';

const getAllFaculties = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, facultyFilterableFields);

  const paginationOptions = pick(req.query, paginationFields);

  const result = await facultyService.getAllFaculties(
    filters,
    paginationOptions
  );

  sendResponse<TFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculties retrieved successfully !',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await facultyService.getSingleFaculty(id);

  sendResponse<TFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty retrieved successfully !',
    data: result,
  });
});

const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await facultyService.updateFaculty(id, updatedData);

  sendResponse<TFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty updated successfully !',
    data: result,
  });
});

const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await facultyService.deleteFaculty(id);

  sendResponse<TFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty deleted successfully !',
    data: result,
  });
});

export const facultyController = {
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
