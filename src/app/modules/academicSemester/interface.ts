import { Model } from 'mongoose';

// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
// Type == T
// Academic Semester == AS
// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩

export type TAS_Months =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type TAS_Titles = 'Autumn' | 'Summer' | 'Fall';
export type TAS_Codes = '01' | '02' | '03';

export type TAS = {
  title: TAS_Titles;
  year: string;
  code: TAS_Codes;
  startMonth: TAS_Months;
  endMonth: TAS_Months;
};

// 🟢🟢🟢 Create a new Model 🟢🟢🟢
export type TAS_Model = Model<TAS>;

export type TAS_Filter = {
  searchTerm: string;
};
