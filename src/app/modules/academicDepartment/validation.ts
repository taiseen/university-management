import { z } from 'zod';
// Router utilized this file...

// 🟨🟨🟨🟨🟨🟨🟨🟨🟨
// academicDepartment == aD
// Academic Department == AD
// 🟨🟨🟨🟨🟨🟨🟨🟨🟨

// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
const create_AD_ZodSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }),
    academicFaculty: z.string({
      required_error: 'Academic Faculty is required',
    }),
  }),
});

// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
const update_AD_ZodSchema = z.object({
  body: z.object({
    title: z.string().optional(), // update one or many fields together
    academicFaculty: z.string().optional(), // update one or many fields together
  }),
});

export const aD_Validation = {
  create_AD_ZodSchema,
  update_AD_ZodSchema,
};
