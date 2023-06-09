import { Model } from 'mongoose';

export type TUser = {
  id: string;
  role: string;
  password: string;
};

// Create a new Model
export type TUserModel = Model<TUser, Record<string, unknown>>;
