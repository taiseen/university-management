import {
  TAcademicSemesterCodes,
  TAcademicSemesterMonths,
  TAcademicSemesterTitles,
} from './interface';

export const academicSemesterCodes: TAcademicSemesterCodes[] = [
  '01',
  '02',
  '03',
];

export const academicSemesterTitles: TAcademicSemesterTitles[] = [
  'Autumn',
  'Summer',
  'Fall',
];

export const academicSemesterMonths: TAcademicSemesterMonths[] = [
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

export const academicSemesterTitleMapper: {
  [key: string]: string;
} = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};
