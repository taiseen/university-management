import { TAF_Model, TAF } from './interface';
import { Schema, model } from 'mongoose';

// 🟨🟨🟨🟨🟨🟨🟨🟨🟨
// academicFaculty == aF
// 🟨🟨🟨🟨🟨🟨🟨🟨🟨

// 🟢🟢🟢 Create a new Schema 🟢🟢🟢
const aF_Schema = new Schema<TAF>(
  {
    title: { type: String, required: true, unique: true },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export const aF_Model = model<TAF, TAF_Model>('AcademicFaculty', aF_Schema);
