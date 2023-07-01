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
  name: TUserName;
  dateOfBirth: string;
  gender: TGender;
  bloodGroup: TBloodGroup;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImg: string;
  academicFaculty: Types.ObjectId | TAF;
  academicDepartment: Types.ObjectId | TAD;
  academicSemester: Types.ObjectId | TAS;
};

export type TStudentModel = Model<TStudent, Record<string, unknown>>;
