import { Schema, model } from 'mongoose';
import { TMD, TMD_Model } from './interface';

const MD_Schema = new Schema<TMD, TMD_Model>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const mD_Model = model<TMD, TMD_Model>(
  'ManagementDepartment',
  MD_Schema
);
