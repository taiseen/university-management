import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import httpStatus from 'http-status';
import { sendResponse } from '../../../shared/sendResponse';
import { paginationFields } from '../../../constants';
import { adminFilterableFields } from './constant';
import { Request, Response } from 'express';
import { admin_Service } from './service';
import { TAdmin } from './interface';

const getSingleAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await admin_Service.getSingleAdmin(id);

  sendResponse<TAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin fetched successfully !',
    data: result,
  });
});

const getAllAdmins = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, adminFilterableFields);

  const paginationOptions = pick(req.query, paginationFields);

  const result = await admin_Service.getAllAdmins(filters, paginationOptions);

  sendResponse<TAdmin[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admins fetched successfully !',
    meta: result.meta,
    data: result.data,
  });
});

const updateAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const updatedData = req.body;

  const result = await admin_Service.updateAdmin(id, updatedData);

  sendResponse<TAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin updated successfully !',
    data: result,
  });
});

const deleteAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await admin_Service.deleteAdmin(id);

  sendResponse<TAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin deleted successfully !',
    data: result,
  });
});

export const admin_Controller = {
  getSingleAdmin,
  getAllAdmins,
  updateAdmin,
  deleteAdmin,
};
