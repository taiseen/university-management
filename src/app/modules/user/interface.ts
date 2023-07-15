/* eslint-disable no-unused-vars */

import { TFaculty } from '../faculty/interface';
import { TStudent } from '../student/interface';
import { TAdmin } from '../admin/interface';
import { Model, Types } from 'mongoose';

export type TUser = {
  id: string;
  role: string;
  password: string;
  needsPasswordChange: boolean;
  passwordChangedAt?: Date;
  student?: Types.ObjectId | TStudent;
  faculty?: Types.ObjectId | TFaculty;
  admin?: Types.ObjectId | TAdmin;
};

export type userPartialPro = 'id' | 'role' | 'password' | 'needsPasswordChange';

// Create a Model Type...

export type TUserModel = {
  isUserExist(id: string): Promise<Pick<TUser, userPartialPro>>;

  isPasswordMatched(givenPass: string, savePass: string): Promise<boolean>;
} & Model<TUser>;
