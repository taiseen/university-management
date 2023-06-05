import Service from './Service';

import { Request, Response } from 'express';

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

const newUserCreate = async (req: Request, res: Response) => {
  try {
    const { user } = req.body;

    const result = await Service.createNewUser(user);

    sendResponse(res, 200, 'User created successfully', result);
  } catch (error) {
    sendResponse(res, 400, 'Failed to create new user');
  }
};

export default {
  newUserCreate,
};
