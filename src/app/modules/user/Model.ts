import { Model, Schema, model } from 'mongoose';
import { TUser } from './Interface';

// Create a new Model
type UserModel = Model<TUser, object>;

// Create a new Schema
const userSchema = new Schema<TUser>(
  {
    id: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export const User = model<TUser, UserModel>('User', userSchema);
