import { TUser, TUserModel } from './interface';
import { Schema, model } from 'mongoose';

// Create a new Schema
const userSchema = new Schema<TUser>(
  {
    id: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    password: { type: String, required: true },
    student: { type: Schema.Types.ObjectId, ref: 'Student' },
    // faculty: { type: Schema.Types.ObjectId, ref: 'Faculty' },
    // admin: { type: Schema.Types.ObjectId, ref: 'Admin' },
  },
  { timestamps: true, toJSON: { virtuals: true } } // for getting normal id
);

export const userModel = model<TUser, TUserModel>('User', userSchema);
