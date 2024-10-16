import { z } from 'zod';

export const HasIDSchema = z.object({
  id: z.string(),
});
