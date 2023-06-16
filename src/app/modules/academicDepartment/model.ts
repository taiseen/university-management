import { TAD_Model, TAD } from './interface';
import { Schema, model } from 'mongoose';

// 🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨
// academicDepartment == aD
// 🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨

// 🟢🟢🟢 Create a new Schema 🟢🟢🟢
const aD_Schema = new Schema<TAD, TAD_Model>(
  {
    title: { type: String, required: true, unique: true },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export const aD_Model = model<TAD, TAD_Model>('AcademicDepartment', aD_Schema);
