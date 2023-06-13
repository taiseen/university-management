import { SortOrder } from 'mongoose';
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
  meta?: TPaginationResponse;
  data?: T | null;
};

export type TPagination = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
};

type TPaginationResponse = { page: number; limit: number; total: number };

export type TGenericResponse<T> = {
  meta: TPaginationResponse;
  data: T;
};

export type TOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: SortOrder;
};

export type TOptionsReturn = {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: SortOrder;
};
