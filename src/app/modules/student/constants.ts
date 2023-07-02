import { TBloodGroup, TGender } from './interface';

export const gender: TGender[] = ['male', 'female'];
export const bloodGroup: TBloodGroup[] = [
  'A+',
  'A-',
  'B+',
  'B-',
  'AB+',
  'AB-',
  'O+',
  'O-',
];

export const studentSearchableFields: string[] = [
  'id',
  'email',
  'contactNo',
  'bloodGroup',
  'emergencyContactNo',
  'name.firstName',
  'name.middleName',
  'name.lastName',
];

export const studentFilterableFields: string[] = [
  'searchTerm',
  ...studentSearchableFields,
];
