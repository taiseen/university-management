import { aS_Months, aS_Codes, aS_Titles } from './constants';
import { z } from 'zod';

// Router utilized this file...

// 🟨🟨🟨🟨🟨🟨🟨🟨🟨
// academicSemester == aS
// Academic Semester == AS
// 🟨🟨🟨🟨🟨🟨🟨🟨🟨

// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
const create_AS_ZodSchema = z.object({
  body: z.object({
    title: z.enum([...aS_Titles] as [string, ...string[]], {
      required_error: 'Title is required',
    }),

    year: z.string({ required_error: 'Year is required' }),

    code: z.enum([...aS_Codes] as [string, ...string[]]),

    startMonth: z.enum([...aS_Months] as [string, ...string[]], {
      required_error: 'Start month is required',
    }),

    endMonth: z.enum([...aS_Months] as [string, ...string[]], {
      required_error: 'End month is required',
    }),
  }),
});

// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
const update_AS_ZodSchema = z
  .object({
    body: z.object({
      title: z
        .enum([...aS_Titles] as [string, ...string[]], {
          required_error: 'Title is required',
        })
        .optional(),

      year: z.string({ required_error: 'Year is required' }).optional(),

      code: z.enum([...aS_Codes] as [string, ...string[]]).optional(),

      startMonth: z
        .enum([...aS_Months] as [string, ...string[]], {
          required_error: 'Start month is required',
        })
        .optional(),

      endMonth: z
        .enum([...aS_Months] as [string, ...string[]], {
          required_error: 'End month is required',
        })
        .optional(),
    }),
  })
  .refine(
    data =>
      (data.body.title && data.body.code) ||
      (!data.body.title && !data.body.code),
    {
      message: 'Both title & code provide Or neither',
    }
  );

export const aS_Validation = {
  create_AS_ZodSchema,
  update_AS_ZodSchema,
};
