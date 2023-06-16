import { sendResponse } from '../../../shared/sendResponse';
import { paginationFields } from '../../../constants';
import { aD_FilterableFields } from './constants';
import { Request, Response } from 'express';
import { aD_Service } from './service';
import { TAD } from './interface';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import httpStatus from 'http-status';

// 🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨
// academicDepartment == aD
// 🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨

// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩

// Higher Order Function (HOF) - use here... for reduce code duplication

const createDepartment = catchAsync(async (req: Request, res: Response) => {
  const { ...aD_Data } = req.body;

  const result = await aD_Service.createDepartment(aD_Data);

  const responseData = {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Department created successfully',
    data: result,
  };

  sendResponse<TAD>(res, responseData);
});

// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
const getAllDepartment = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, aD_FilterableFields);

  const paginationOptions = pick(req.query, paginationFields);

  const result = await aD_Service.getAllDepartment(filters, paginationOptions);

  sendResponse<TAD[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Department retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
const getSingleDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await aD_Service.getSingleDepartment(id);

  sendResponse<TAD>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Selected Department retrieved successfully',
    data: result,
  });
});

// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
const updateDepartment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updateData = req.body;

  const result = await aD_Service.updateDepartment(id, updateData);

  const responseData = {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Department updated successfully',
    data: result,
  };

  sendResponse<TAD>(res, responseData);
});

// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
const deleteDepartment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await aD_Service.deleteDepartment(id);

  const responseData = {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Department delete successfully',
    data: result,
  };

  sendResponse<TAD>(res, responseData);
});

export const aD_Controller = {
  createDepartment,
  getAllDepartment,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
};
