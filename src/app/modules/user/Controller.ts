import { sendResponse } from '../../../shared/sendResponse';
import { Request, Response } from 'express';
import { userService } from './service';
import { TUser } from './interface';
import catchAsync from '../../../shared/catchAsync';
import httpStatus from 'http-status';

// Higher Order Function (HOF) - use here... for reduce code duplication
const createStudent = catchAsync(async (req: Request, res: Response) => {
  const { student, ...userData } = req.body;

  const result = await userService.createStudent(student, userData);

  const responseData = {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student - created successfully ✅',
    data: result,
  };

  sendResponse<TUser>(res, responseData);
});

export const userController = {
  createStudent,
};
