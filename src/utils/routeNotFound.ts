import { TRouteNotFoundResponse } from '../interfaces/common';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

const routeNotFound = (req: Request, res: Response, next: NextFunction) => {
  const responseData: TRouteNotFoundResponse = {
    status: false,
    message: 'Route Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API not found',
      },
    ],
  };

  res.status(httpStatus.NOT_FOUND).json(responseData);

  next();
};

export default routeNotFound;
