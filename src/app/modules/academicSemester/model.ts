import { TAcademicSemesterModel, TAcademicSemester } from './interface';
import { Schema, model } from 'mongoose';
import {
  academicSemesterCodes,
  academicSemesterMonths,
  academicSemesterTitles,
} from './constants';
import ApiError from '../../../error/ApiError';
import httpStatus from 'http-status';

// Create a new Schema
const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    title: { type: String, required: true, enum: academicSemesterTitles },
    year: { type: Number, required: true },
    code: { type: String, required: true, enum: academicSemesterCodes },
    startMonth: { type: String, required: true, enum: academicSemesterMonths },
    endMonth: { type: String, required: true, enum: academicSemesterMonths },
  },
  { timestamps: true }
);

// this kind of common data checking perform inside - [Schema]
// & this kind of hook always use before - [Model]

// using hook for data checking, before save in DB
academicSemesterSchema.pre('save', async function (next) {
  const isExist = await AcademicSemesterModel.findOne({
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

export const AcademicSemesterModel = model<
  TAcademicSemester,
  TAcademicSemesterModel
>('AcademicSemester', academicSemesterSchema);
