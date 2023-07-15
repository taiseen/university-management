/* eslint-disable @typescript-eslint/no-this-alias */
import { TUser, TUserModel, userPartialPro } from './interface';
import { Schema, model } from 'mongoose';
import config from '../../../config';
import bcrypt from 'bcrypt';

// Create a new Schema
const userSchema = new Schema<TUser, TUserModel>(
  {
    id: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    password: { type: String, required: true, select: 0 }, // select: 0 --> don't send this data at client side.
    needsPasswordChange: { type: Boolean, default: true },
    passwordChangedAt: { type: Date },
    student: { type: Schema.Types.ObjectId, ref: 'Student' },
    faculty: { type: Schema.Types.ObjectId, ref: 'Faculty' },
    admin: { type: Schema.Types.ObjectId, ref: 'Admin' },
  },
  { timestamps: true, toJSON: { virtuals: true } } // for getting normal id
);

// 🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢
// Common things, are used by "instance method()"
// 🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢

// 🔍🔍🔍 checking that user exist or not 🔍🔍🔍
userSchema.statics.isUserExist = async function (
  id: string
): Promise<Pick<TUser, userPartialPro> | null> {
  return await userModel
    .findOne({ id }, { id: 1, password: 1, role: 1, needsPasswordChange: 1 }) // with field filtering...
    .lean();
};

// 🔍🔍🔍 checking user given password match or not 🔍🔍🔍
userSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

// 🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢
// common for all user creation...
// 🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢
userSchema.pre('save', async function (next) {
  // hashing user password

  const user = this;

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bycryptSaltRounds)
  );

  if (!user.needsPasswordChange) {
    user.passwordChangedAt = new Date();
  }

  next();
});

export const userModel = model<TUser, TUserModel>('User', userSchema);
