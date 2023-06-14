import { TGenericErrorRes } from '../interfaces/common';
import { TGenericErrorMessage } from '../interfaces/error';
import { ZodError, ZodIssue } from 'zod';

const handleZodError = (error: ZodError): TGenericErrorRes => {
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
