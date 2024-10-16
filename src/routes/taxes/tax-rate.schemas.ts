import { z } from '@hono/zod-openapi';

import { TaxGroup } from '~/lib/enums/tax-group';
import { TaxRateName } from '~/lib/enums/tax-rate-name';

import { HasIDSchema } from '../../lib/schemas/has-id';

export const TaxRateSchema = z.object({
  taxGroup: z.nativeEnum(TaxGroup),
  name: z.nativeEnum(TaxRateName),
  rate: z.number().min(0),
  calculationBase: z.string(),
  meta: z.object({
    withVAT: z.boolean().optional(),
  }).optional(),
});

export const TaxRateWithIdSchema = TaxRateSchema.merge(HasIDSchema);

export type TaxRate = z.infer<typeof TaxRateWithIdSchema>;

export const SimplifiedTaxRateSchema = z.object({
  taxRate: z.number().min(0),
  socialContributionRate: z.number().min(0),
});

export type SimplifiedTaxRate = z.infer<typeof SimplifiedTaxRateSchema>;

export const GeneralTaxRateSchema = SimplifiedTaxRateSchema.extend({
  militaryContributionRate: z.number().min(0),
});

export type GeneralTaxRate = z.infer<typeof GeneralTaxRateSchema>;
