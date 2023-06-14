import { aS_Months, aS_Codes, aS_Titles } from './constants';
import { z } from 'zod';

// Router utilized this file...

// 🟨🟨🟨🟨🟨🟨🟨🟨🟨
// academicSemester == aS
// Academic Semester == AS
// 🟨🟨🟨🟨🟨🟨🟨🟨🟨

const create_AS_ZodSchema = z.object({
  body: z.object({
    title: z.enum([...aS_Titles] as [string, ...string[]], {
      required_error: 'Title is required',
    }),

    year: z.number({ required_error: 'Year is required' }),

    code: z.enum([...aS_Codes] as [string, ...string[]]),

    startMonth: z.enum([...aS_Months] as [string, ...string[]], {
      required_error: 'Start month is required',
    }),

    endMonth: z.enum([...aS_Months] as [string, ...string[]], {
      required_error: 'End month is required',
    }),
  }),
});

export const aS_Validation = {
  create_AS_ZodSchema,
};
