import { TGenericErrorMessage } from './error';

export type TGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: TGenericErrorMessage[];
};

export type TRouteNotFoundResponse = {
  status: boolean;
  message: string;
  errorMessages: TGenericErrorMessage[];
};

export type TResponseData<T> = {
  success: boolean;
  statusCode: number;
  message?: string | null;
  data?: T | null;
};
