import { z } from 'zod';

const create_MD_ZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
  }),
});

const update_MD_ZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
  }),
});

export const MD_Validation = {
  create_MD_ZodSchema,
  update_MD_ZodSchema,
};
