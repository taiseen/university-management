// DataBase Logic...

import { aS_Model } from '../academicSemester/model';
import { TAS } from '../academicSemester/interface';
import { TStudent } from '../student/interface';
import { studentModel } from '../student/model';
import { TFaculty } from '../faculty/interface';
import { facultyModel } from '../faculty/model';
import { generateStudentId } from './utils';
import { TUser } from './interfaces';
import { userModel } from './model';
import ApiError from '../../../error/ApiError';
import config from '../../../config';
import httpStatus from 'http-status';
import mongoose from 'mongoose';

const userTypes = ['student', 'faculty', 'admin'];
const aD = 'academicDepartment';
const aS = 'academicSemester';
const aF = 'academicFaculty';

const createStudent = async (
  student: TStudent,
  user: TUser
): Promise<TUser | null> => {
  // set default password
  if (!user.password) {
    user.password = config.defaultStudentPass as string;
  }

  // set role
  user.role = userTypes[0];

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
        path: userTypes[0],
        populate: [{ path: aS }, { path: aD }, { path: aF }],
      });
  }

  return newUserAllData;
};

const createFaculty = async (
  faculty: TFaculty,
  user: TUser
): Promise<TUser | null> => {
  // If password is not given,set default password
  if (!user.password) {
    user.password = config.defaultFacultyPass as string;
  }

  // set role
  user.role = userTypes[1];

  let newUserAllData = null;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // generate faculty id
    // const id = await generateFacultyId();

    // set custom id into both  faculty & user
    // user.id = id;
    // faculty.id = id;

    // Create faculty using session
    const newFaculty = await facultyModel.create([faculty], { session });

    if (!newFaculty.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
    }
    // set faculty _id (reference) into user.student
    user.faculty = newFaculty[0]._id;

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

  if (newUserAllData) {
    newUserAllData = await userModel
      .findOne({ id: newUserAllData.id })
      .populate({
        path: userTypes[1],
        populate: [{ path: aD }, { path: aF }],
      });
  }

  return newUserAllData;
};

export const userService = {
  createStudent,
  createFaculty,
};
