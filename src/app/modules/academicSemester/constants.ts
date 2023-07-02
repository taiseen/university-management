import { TAS_Codes, TAS_Months, TAS_Titles } from './interface';

// 🟩🟩🟩🟩🟩🟩🟩🟩🟩
// academicSemester == aS
// 🟩🟩🟩🟩🟩🟩🟩🟩🟩

export const aS_Codes: TAS_Codes[] = ['01', '02', '03'];

export const aS_Titles: TAS_Titles[] = ['Autumn', 'Summer', 'Fall'];

export const aS_Months: TAS_Months[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const aS_TitleMapper: {
  [key: string]: string;
} = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};

export const aS_SearchableFields: string[] = ['title', 'code', 'year'];

export const aS_FilterableFields: string[] = [
  'searchTerm',
  ...aS_SearchableFields,
];
