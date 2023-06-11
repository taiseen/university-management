import { academicSemesterTitleMapper } from './constants';
import { TAcademicSemester } from './interface';
import { AcademicSemesterModel } from './model';
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

export const AcademicSemesterService = {
  createSemester,
};
