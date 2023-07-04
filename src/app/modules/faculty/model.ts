import { TFaculty } from './interface';
import { model } from 'mongoose';

export const facultyModel = model<TFaculty>('Faculty');
