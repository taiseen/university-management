import { TAS } from '../academicSemester/interface';
import { userModel } from './model';

const findLastStudentId = async (): Promise<string | undefined> => {
  const lastUserId = await userModel
    .findOne({ role: 'student' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean(); // for smooth & faster DB operation

  return lastUserId?.id ? lastUserId?.id.substring(4) : undefined;
};

export const generateStudentId = async (
  academicSemester: TAS
): Promise<string> => {
  const { year, code } = academicSemester;

  // create new user id || find existing user id...
  const currentId =
    (await findLastStudentId()) || (0).toString().padStart(5, '0');

  // increment id by 1
  let incrementalId = (+currentId + 1).toString().padStart(5, '0');

  incrementalId = `${year.substring(2)}${code}${incrementalId}`;

  return incrementalId;
};

const findLastFacultyId = async (): Promise<string | undefined> => {
  const lastFaculty = await userModel
    .findOne({ role: 'faculty' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean(); // for smooth & faster DB operation

  return lastFaculty?.id ? lastFaculty?.id.substring(2) : undefined;
};

export const generateFacultyId = async (): Promise<string | undefined> => {
  const currentId =
    (await findLastFacultyId()) || (0).toString().padStart(5, '0');

  // increment id by 1
  let incrementalId = (+currentId + 1).toString().padStart(5, '0');

  incrementalId = `F-${incrementalId}`;

  return incrementalId;
};
