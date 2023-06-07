import { TGenericErrorMessage } from '../../interfaces/error';
import { NextFunction, Request, Response } from 'express';
import config from '../../config';

const globalErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = 500;
  const message = 'Something went wrong...';
  const errorMessage: TGenericErrorMessage[] = [];

  res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    stack: config.env === 'development' ? err.stack : undefined,
  });

  next();
};

export default globalErrorHandler;
