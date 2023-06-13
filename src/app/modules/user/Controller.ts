import { sendResponse } from '../../../shared/sendResponse';
import { NextFunction, Request, Response } from 'express';
import { userService } from './Service';
import { TUser } from './Interface';
import catchAsync from '../../../shared/catchAsync';
import httpStatus from 'http-status';

// Higher Order Function (HOF) - use here... for reduce code duplication
const newUserCreate = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body;

    const result = await userService.createNewUser(user);

    const responseData = {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User created successfully ✅',
      data: result,
    };

    sendResponse<TUser>(res, responseData);

    next();
  }
);

export const userController = {
  newUserCreate,
};
