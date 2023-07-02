import { TAD } from '../academicDepartment/interface';
import { TAS } from '../academicSemester/interface';
import { TAF } from '../academicFaculty/interface';
import { Model, Types } from 'mongoose';

export type TGender = 'male' | 'female';

export type TBloodGroup =
  | 'A+'
  | 'A-'
  | 'B+'
  | 'B-'
  | 'AB+'
  | 'AB-'
  | 'O+'
  | 'O-';

export type TUserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
  address: string;
};

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

// student interface created - by - student schema types...
export type TStudent = {
  id: string;
  name: TUserName; // embedded object

  gender: TGender; // literals values
  bloodGroup: TBloodGroup; // literals values

  email: string;
  dateOfBirth: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  profileImg: string;

  guardian: TGuardian; // embedded object
  localGuardian: TLocalGuardian; // embedded object

  academicFaculty: Types.ObjectId | TAF; // reference
  academicDepartment: Types.ObjectId | TAD; // reference
  academicSemester: Types.ObjectId | TAS; // reference
};

export type TStudentModel = Model<TStudent, Record<string, unknown>>;

export type TStudentFilter = {
  searchTerm?: string;
  id?: string;
  email?: string;
  contactNo?: string;
  bloodGroup?: string;
  emergencyContactNo?: string;
};
