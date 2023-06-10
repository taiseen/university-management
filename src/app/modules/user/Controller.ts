import { sendResponse } from '../sendResponse';
import { RequestHandler } from 'express';
import { userService } from './Service';

const newUserCreate: RequestHandler = async (req, res, next) => {
  try {
    const { user } = req.body;

    const result = await userService.createNewUser(user);

    sendResponse(res, 200, 'User created successfully ✅', result);
  } catch (error) {
    next(error);
  }
};

export const userController = {
  newUserCreate,
};
