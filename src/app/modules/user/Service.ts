// DataBase Logic...

import { aS_Model } from '../academicSemester/model';
import { TAS } from '../academicSemester/interface';
import { TStudent } from '../student/interface';
import { studentModel } from '../student/model';
import { generateStudentId } from './utils';
import { TUser } from './interface';
import { userModel } from './model';
import ApiError from '../../../error/ApiError';
import config from '../../../config';
import httpStatus from 'http-status';
import mongoose from 'mongoose';

const createStudent = async (
  student: TStudent,
  user: TUser
): Promise<TUser | null> => {
  // set default password
  if (!user.password) {
    user.password = config.defaultStudentPass as string;
  }

  // set role
  user.role = 'student';

  const academicSemester = await aS_Model
    .findById(student.academicSemester)
    .lean();

  // generate student id
  let newUserAllData = null;

  // for --> transaction & roll-back... [ACID]
  const session = await mongoose.startSession();

  try {
    // ✅✅✅ must start session for transaction...
    session.startTransaction();

    // auto generate incremental id
    const id = await generateStudentId(academicSemester as TAS);

    user.id = id;
    student.id = id;

    // 🟩🟩🟩 new student create...
    // 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
    const newStudent = await studentModel.create([student], { session });

    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_GATEWAY, 'Failed to create student...');
    }

    // set student -->  _id into user.student
    user.student = newStudent[0]._id;

    // 🟩🟩🟩 new user create...
    // 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
    const newUser = await userModel.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();

    throw error;
  }

  // nested level data populate...
  if (newUserAllData) {
    newUserAllData = await userModel
      .findOne({ id: newUserAllData.id })
      .populate({
        path: 'student',
        populate: [
          {
            path: 'academicSemester',
          },
          {
            path: 'academicDepartment',
          },
          {
            path: 'academicFaculty',
          },
        ],
      });
  }

  return newUserAllData;
};

export const userService = {
  createStudent,
};
