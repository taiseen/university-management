import { TGenericErrorResponse } from '../interfaces/common';
import { ZodError, ZodIssue } from 'zod';
import { TGenericErrorMessage } from '../interfaces/error';

const handleZodError = (error: ZodError): TGenericErrorResponse => {
  const errors: TGenericErrorMessage[] = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue?.path.length - 1],
      message: issue?.message,
    };
  });

  const statusCode = 400;

  //   console.log(
  //     error.issues.map(issue => issue.path),
  //     '🔴🔴🔴'
  //   );

  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  };
};

export default handleZodError;
