import { TBloodGroup, TGender } from '../student/interface';
import { TMD } from '../managementDepartment/interface';
import { Model, Types } from 'mongoose';

export type TUserName = {
  firstName: string;
  lastName: string;
  middleName: string;
};

export type TAdmin = {
  id: string;
  name: TUserName;
  email: string;

  contactNo: string;
  profileImage: string;
  dateOfBirth?: string;
  emergencyContactNo: string;

  gender?: TGender;
  bloodGroup?: TBloodGroup;

  permanentAddress?: string;
  presentAddress?: string;

  managementDepartment: Types.ObjectId | TMD;
  designation: string;
};

export type TAdminFilters = {
  searchTerm?: string;

  id?: string;
  email?: string;
  contactNo?: string;
  emergencyContactNo?: string;

  gender?: TGender;
  bloodGroup?: TBloodGroup;

  managementDepartment?: string;
  designation?: string;
};

export type TAdmin_Model = Model<TAdmin, Record<string, unknown>>;
