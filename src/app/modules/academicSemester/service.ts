import { TGenericResponse, TPagination } from '../../../interfaces/common';
import { academicSemesterTitleMapper } from './constants';
import { TAcademicSemester } from './interface';
import { AcademicSemesterModel } from './model';
import { SortOrder } from 'mongoose';
import calculatePagination from '../../../utils/calculatePagination';
import ApiError from '../../../error/ApiError';
import httpStatus from 'http-status';

const createSemester = async (
  payload: TAcademicSemester
): Promise<TAcademicSemester> => {
  if (academicSemesterTitleMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Semester Code');
  }

  const result = await AcademicSemesterModel.create(payload);

  return result;
};

// get documents with pagination support...
const getAllSemesters = async (
  paginationOptions: TPagination
): Promise<TGenericResponse<TAcademicSemester[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const result = await AcademicSemesterModel.find()
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await AcademicSemesterModel.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result, // return [array of {objects}]
  };
};

export const AcademicSemesterService = {
  createSemester,
  getAllSemesters,
};
