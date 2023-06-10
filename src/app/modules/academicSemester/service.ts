import { TAcademicSemester } from './interface';
import { AcademicSemesterModel } from './model';

const createSemester = async (
  payload: TAcademicSemester
): Promise<TAcademicSemester> => {
  const result = await AcademicSemesterModel.create(payload);
  return result;
};

export const AcademicSemesterService = {
  createSemester,
};
