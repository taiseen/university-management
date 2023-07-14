import { TUser, TUserModel } from './interface';
import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

// Create a new Schema
const userSchema = new Schema<TUser>(
  {
    id: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    password: { type: String, required: true, select: 0 }, // select: 0 --> don't send this data at client side.
    needsPasswordChange: { type: Boolean, default: true },
    // passwordChangedAt: { type: Date },
    student: { type: Schema.Types.ObjectId, ref: 'Student' },
    faculty: { type: Schema.Types.ObjectId, ref: 'Faculty' },
    // admin: { type: Schema.Types.ObjectId, ref: 'Admin' },
  },
  { timestamps: true, toJSON: { virtuals: true } } // for getting normal id
);

// 🔍🔍🔍 checking that user exist or not 🔍🔍🔍
userSchema.statics.isUserExist = async function (
  id: string
): Promise<TUser | null> {
  return await userModel.findOne(
    { id },
    { id: 1, password: 1, role: 1, needsPasswordChange: 1 }
  );
};

// 🔍🔍🔍 checking user given password match or not 🔍🔍🔍
userSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

export const userModel = model<TUser, TUserModel>('User', userSchema);
