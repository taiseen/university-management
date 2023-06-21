import { TAS } from '../academicSemester/interface';
import { User } from './Model';

const findLastStudentId = async () => {
  const lastUserId = await User.findOne({}, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastUserId?.id;
};

export const generateStudentId = async (academicSemester: TAS) => {
  const { year, code } = academicSemester;

  // create new user id || find existing user id...
  const currentId =
    (await findLastStudentId()) || (0).toString().padStart(5, '0');

  // increment id by 1
  let incrementalId = (+currentId + 1).toString().padStart(5, '0');

  incrementalId = `${year.substring(2)}${code}${incrementalId}`;

  return incrementalId;
};
