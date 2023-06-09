import { RequestHandler, Response } from 'express';
import { userService } from './Service';

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

const newUserCreate: RequestHandler = async (req, res, next) => {
  try {
    const { user } = req.body;

    const result = await userService.createNewUser(user);

    sendResponse(res, 200, 'User created successfully', result);
  } catch (error) {
    next(error);
  }
};

export const userController = {
  newUserCreate,
};
