import { bloodGroup, gender } from '../student/constants';
import { TAdmin, TAdmin_Model } from './interface';
import { Schema, model } from 'mongoose';

const admin_Schema = new Schema<TAdmin, TAdmin_Model>(
  {
    id: { type: String, required: true, unique: true },
    name: {
      type: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        middleName: { type: String, required: false },
      },
      required: true,
    },

    gender: { type: String, enum: gender },
    bloodGroup: { type: String, enum: bloodGroup },

    dateOfBirth: { type: String },
    email: { type: String, unique: true, required: true },
    contactNo: { type: String, unique: true, required: true },
    emergencyContactNo: { type: String, required: true },

    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },

    managementDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'ManagementDepartment',
      required: true,
    },

    designation: { type: String, required: true },
    profileImage: { type: String },
  },
  { timestamps: true }
);

export const admin_Model = model<TAdmin, TAdmin_Model>('Admin', admin_Schema);
