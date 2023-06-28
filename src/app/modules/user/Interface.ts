import { TAF } from './../academicFaculty/interface';
import { Model, Types } from 'mongoose';

export type TUser = {
  id: string;
  role: string;
  password: string;
  student?: Types.ObjectId || TStudent;
  faculty?: Types.ObjectId || TAF;
  admin?: Types.ObjectId || TAdmin;
};

// Create a new Model
export type TUserModel = Model<TUser, Record<string, unknown>>;
