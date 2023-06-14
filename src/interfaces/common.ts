import { TGenericErrorMessage } from './error';
import { SortOrder } from 'mongoose';

export type TGenericErrorRes = {
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
  meta?: TPaginationRes;
  data?: T | null;
};

export type TPagination = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
};

type TPaginationRes = { page: number; limit: number; total: number };

export type TGenericRes<T> = {
  meta: TPaginationRes;
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
