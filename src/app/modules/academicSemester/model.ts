import { TAcademicSemesterModel, TAcademicSemester } from './interface';
import { Schema, model } from 'mongoose';
import {
  academicSemesterCodes,
  academicSemesterMonths,
  academicSemesterTitles,
} from './constants';

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

export const AcademicSemesterModel = model<
  TAcademicSemester,
  TAcademicSemesterModel
>('AcademicSemester', academicSemesterSchema);
