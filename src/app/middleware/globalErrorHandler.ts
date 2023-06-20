/* eslint-disable no-unused-expressions */
import { TGenericErrorMessage } from '../../interfaces/error';
import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import handleValidationError from '../../error/handleValidationError';
import handleCastError from '../../error/handleCastError';
import handleZodError from '../../error/handleZodError';
import ApiError from '../../error/ApiError';
import config from '../../config';

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  // config.env === 'development'
  //   ? console.log('globalErrorHandler ==>', error)
  //   : errorLog.error('globalErrorHandler ==>', error);

  let statusCode = 500;
  let message = 'Something went wrong...';
  let errorMessage: TGenericErrorMessage[] = [];

  if (error.name === 'ValidationError') {
    const simplifyError = handleValidationError(error);
    statusCode = simplifyError.statusCode;
    message = simplifyError.message;
    errorMessage = simplifyError.errorMessages;
  } else if (error instanceof ZodError) {
    const simplifyError = handleZodError(error);
    statusCode = simplifyError.statusCode;
    message = simplifyError.message;
    errorMessage = simplifyError.errorMessages;
  } else if (error.name === 'CastError') {
    // res.status(200).json({ error });
    const simplifyError = handleCastError(error);
    statusCode = simplifyError.statusCode;
    message = simplifyError.message;
    errorMessage = simplifyError.errorMessages;
  } else if (error instanceof ApiError) {
    statusCode = error.statusCode;
    message = error.message;
    errorMessage = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessage = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  }

  // common error patter - send to frontend...
  res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    stack: config.env === 'development' ? error.stack : undefined,
  });

  // next();
};

export default globalErrorHandler;
