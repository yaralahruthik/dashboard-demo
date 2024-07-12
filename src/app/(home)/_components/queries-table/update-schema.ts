import { z } from 'zod';

export const QueryUpdateSchema = z.object({
  priority: z.string().trim().optional(),
  assignment: z.string().trim().optional(),
  comments: z.string().trim().optional(),
  status: z.string().trim().optional(),
});

export type QueryUpdateDataType = z.infer<typeof QueryUpdateSchema>;
