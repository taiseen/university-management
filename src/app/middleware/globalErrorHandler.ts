import { TGenericErrorMessage } from '../../interfaces/error';
import { ErrorRequestHandler } from 'express';
import handleValidationError from '../../error/handleValidationError';
import ApiError from '../../error/ApiError';
import config from '../../config';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode = 500;
  let message = 'Something went wrong...';
  let errorMessage: TGenericErrorMessage[] = [];

  if (error.name === 'ValidationError') {
    const simplifyError = handleValidationError(error);
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

  next();
};

export default globalErrorHandler;
