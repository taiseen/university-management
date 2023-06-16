import { aS_Codes, aS_Months, aS_Titles } from './constants';
import { TAS_Model, TAS } from './interface';
import { Schema, model } from 'mongoose';
import ApiError from '../../../error/ApiError';
import httpStatus from 'http-status';

// 🟨🟨🟨🟨🟨🟨🟨🟨🟨
// academicSemester == aS
// 🟨🟨🟨🟨🟨🟨🟨🟨🟨

// 🟢🟢🟢 Create a new Schema 🟢🟢🟢
const aS_Schema = new Schema<TAS>(
  {
    title: { type: String, required: true, enum: aS_Titles },
    year: { type: String, required: true },
    code: { type: String, required: true, enum: aS_Codes },
    startMonth: { type: String, required: true, enum: aS_Months },
    endMonth: { type: String, required: true, enum: aS_Months },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

// this kind of common data checking perform inside - [Schema]
// & this kind of hook always use before - [Model]

// using hook for data checking, before save in DB
aS_Schema.pre('save', async function (next) {
  const isExist = await aS_Model.findOne({
    title: this.title,
    year: this.year,
  });

  if (isExist) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'Academic semester is already exist'
    );
  }

  next(); // mongoose provide this --> next() callback function
});

export const aS_Model = model<TAS, TAS_Model>('AcademicSemester', aS_Schema);
