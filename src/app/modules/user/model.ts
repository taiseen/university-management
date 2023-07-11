/* eslint-disable @typescript-eslint/no-this-alias */
import { TUser, TUserModel } from './interface';
import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import config from '../../../config';

// Create a new Schema
const userSchema = new Schema<TUser>(
  {
    id: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    password: { type: String, required: true },
    student: { type: Schema.Types.ObjectId, ref: 'Student' },
    faculty: { type: Schema.Types.ObjectId, ref: 'Faculty' },
    // admin: { type: Schema.Types.ObjectId, ref: 'Admin' },
  },
  { timestamps: true, toJSON: { virtuals: true } } // for getting normal id
);

// common for all user creation...
userSchema.pre('save', async function (next) {
  // hashing user password

  const user = this;

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bycryptSaltRounds)
  );

  // if (!user.needsPasswordChange) {
  //   user.passwordChangedAt = new Date();
  // }

  next();
});

export const userModel = model<TUser, TUserModel>('User', userSchema);
