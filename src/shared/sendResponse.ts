import { TResponseData } from '../interfaces/common';
import { Response } from 'express';

export const sendResponse = <T>(res: Response, data: TResponseData<T>) => {
  const responseData: TResponseData<T> = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message || null,
    meta: data.meta,
    data: data.data || null,
  };

  res.status(data.statusCode).json(responseData);
};
