import { NextFunction, Request, RequestHandler, Response } from 'express';

// HOF
const catchAsync = (controllerFun: RequestHandler) => {
  // this try-catch repeated task performed here...
  // by Higher Order Function (HOF) - we optimized code...

  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await controllerFun(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

export default catchAsync;
