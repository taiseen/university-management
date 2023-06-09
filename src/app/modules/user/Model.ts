import { TUser, TUserModel } from './Interface';
import { Schema, model } from 'mongoose';

// Create a new Schema
const userSchema = new Schema<TUser>(
  {
    id: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export const User = model<TUser, TUserModel>('User', userSchema);
