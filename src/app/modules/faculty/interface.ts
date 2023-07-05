import { TBloodGroup, TGender, TUserName } from '../student/interface';
import { TAD } from '../academicDepartment/interface';
import { TAF } from '../academicFaculty/interface';
import { Model, Types } from 'mongoose';

export type TFaculty = {
  id: string;

  name: TUserName;

  profileImage: string;
  dateOfBirth?: string;

  email: string;
  contactNo: string;
  emergencyContactNo: string;

  gender?: TGender;
  bloodGroup?: TBloodGroup;

  permanentAddress?: string;
  presentAddress?: string;

  academicDepartment: Types.ObjectId | TAD;
  academicFaculty: Types.ObjectId | TAF;

  designation: string;
};

export type TFacultyModel = Model<TFaculty, Record<string, unknown>>;

export type TFacultyFilters = {
  searchTerm?: string;
  id?: string;
  email?: string;
  contactNo?: string;
  emergencyContactNo?: string;
  gender?: TGender;
  bloodGroup?: TBloodGroup;
  academicDepartment?: string;
  academicFaculty?: string;
  designation?: string;
};
