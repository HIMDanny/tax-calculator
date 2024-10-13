import type { AnyZodObject, ZodArray, ZodUnion } from 'zod';

// @ts-expect-error This is a Zod union
export type ZodSchema = ZodUnion | AnyZodObject | ZodArray<AnyZodObject>;
