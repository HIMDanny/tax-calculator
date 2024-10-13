import { z } from '@hono/zod-openapi';

export function createMessageObjectSchema(message: string = 'Message') {
  return z.object({
    message: z.string(),
  }).openapi({
    example: {
      message,
    },
  });
}
