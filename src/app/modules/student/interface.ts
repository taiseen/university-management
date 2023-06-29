import { InferSchemaType, Model } from 'mongoose';
import { studentSchema } from './model';

// student interface created - by - student schema types...
export type TStudent = InferSchemaType<typeof studentSchema>;

export type studentModel = Model<TStudent, Record<string, unknown>>;
