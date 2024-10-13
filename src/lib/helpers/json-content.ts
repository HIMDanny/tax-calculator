import type { ZodSchema } from 'zod';

export function jsonContent<T extends ZodSchema>(description: string, schema: T) {
  return {
    description,
    content: {
      'application/json': {
        schema,
      },
    },
  };
}
