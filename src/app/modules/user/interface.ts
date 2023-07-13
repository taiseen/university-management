import { TFaculty } from '../faculty/interface';
import { TStudent } from '../student/interface';
import { Model, Types } from 'mongoose';

export type TUser = {
  id: string;
  role: string;
  password: string;
  needsPasswordChange: boolean;
  // passwordChangedAt?: Date;
  student?: Types.ObjectId | TStudent;
  faculty?: Types.ObjectId | TFaculty;
  // admin?: Types.ObjectId | TAdmin;
};

// Create a new Model
export type TUserModel = Model<TUser, Record<string, unknown>>;
