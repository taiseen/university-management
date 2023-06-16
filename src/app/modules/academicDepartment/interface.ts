import { TAF } from '../academicFaculty/interface';
import { Model, Types } from 'mongoose';

// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
// Type == T
// Academic Department == AD
// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩

export type TAD = { title: string; academicFaculty: Types.ObjectId | TAF };

export type TAD_Filter = {
  searchTerm?: string;
  academicFaculty?: Types.ObjectId;
};

// 🟢🟢🟢 Create a new Model 🟢🟢🟢
export type TAD_Model = Model<TAD, Record<string, unknown>>;
