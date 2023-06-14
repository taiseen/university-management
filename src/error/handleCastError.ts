import { TGenericErrorMessage } from '../interfaces/error';
import mongoose from 'mongoose';

const handleCastError = (error: mongoose.Error.CastError) => {
  const errors: TGenericErrorMessage[] = [
    {
      path: error.path,
      message: 'Invalid id',
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  };
};

export default handleCastError;
