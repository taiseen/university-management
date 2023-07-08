import { sendResponse } from '../../../shared/sendResponse';
import { paginationFields } from '../../../constants';
import { mD_FilterableFields } from './constant';
import { Request, Response } from 'express';
import { mD_Service } from './service';
import { TMD } from './interface';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import httpStatus from 'http-status';

const createDepartment = catchAsync(async (req: Request, res: Response) => {
  const { ...departmentData } = req.body;

  const result = await mD_Service.createDepartment(departmentData);

  sendResponse<TMD>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Management department created successfully',
    data: result,
  });
});

const getAllDepartments = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, mD_FilterableFields);

  const paginationOptions = pick(req.query, paginationFields);

  const result = await mD_Service.getAllDepartments(filters, paginationOptions);

  sendResponse<TMD[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Management departments fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await mD_Service.getSingleDepartment(id);

  sendResponse<TMD>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Management department fetched successfully',
    data: result,
  });
});

const updateDepartment = catchAsync(
  catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const updatedData = req.body;
    const result = await mD_Service.updateDepartment(id, updatedData);

    sendResponse<TMD>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management department updated successfully',
      data: result,
    });
  })
);

const deleteDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await mD_Service.deleteDepartment(id);

  sendResponse<TMD>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Management department deleted successfully',
    data: result,
  });
});

export const mD_Controller = {
  createDepartment,
  getAllDepartments,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
};
