import { NextFunction, Request, Response } from 'express';
import Service from './Service';

const sendResponse = <T>(
  res: Response,
  statusCode: number,
  message: string,
  data?: T
) => {
  res.status(statusCode).json({
    success: statusCode >= 200 && statusCode < 300,
    message,
    data,
  });
};

const newUserCreate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req.body;

    const result = await Service.createNewUser(user);

    sendResponse(res, 200, 'User created successfully', result);
  } catch (error) {
    // sendResponse(res, 400, 'Failed to create new user');
    next(error);
  }
};

export default {
  newUserCreate,
};
