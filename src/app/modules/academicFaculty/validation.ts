import { z } from 'zod';
// Router utilized this file...

// 🟨🟨🟨🟨🟨🟨🟨🟨🟨
// academicFaculty == aF
// Academic Faculty == AF
// 🟨🟨🟨🟨🟨🟨🟨🟨🟨

// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
const create_AF_ZodSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }),
  }),
});

// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
const update_AF_ZodSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }),
  }),
});

export const aF_Validation = {
  create_AF_ZodSchema,
  update_AF_ZodSchema,
};
