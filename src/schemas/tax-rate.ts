import { z } from '@hono/zod-openapi';

export const SingleTaxRateSchema = z.object({
  unit: z.enum(['percentage', 'fixed']),
  value: z.number().positive(),
});

export const SimplifiedTaxRateSchema = z.object({
  taxRate: z.number().min(0),
  socialContributionRate: z.number().min(0),
});

export type SimplifiedTaxRate = z.infer<typeof SimplifiedTaxRateSchema>;

export const GeneralTaxRateSchema = SimplifiedTaxRateSchema.extend({
  militaryContributionRate: z.number().min(0),
});

export type GeneralTaxRate = z.infer<typeof GeneralTaxRateSchema>;
