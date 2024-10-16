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

export const CalculateTaxBodySchema = z.object({
  taxGroup: z.nativeEnum(TaxGroup),
  income: z.number().positive().optional().openapi({
    description: 'Необхідний для розрахунку податку для ФОПів 3 групи.',
  }),
  expenses: z.number().min(0).optional().openapi({
    description: 'Витрати для загальної системи оподаткування.',
  }),
  withVAT: z.boolean().optional().optional().openapi({
    description: 'Для ФОПів 3 групи, що є платниками ПДВ.',
  }),
}).refine((fields) => {
  if (fields.taxGroup !== TaxGroup.GROUP3) {
    return true;
  }

  return fields.income;
}, {
  message: 'Поле income обов\'язкове для розрахунку податку для ФОПів 3 групи.',
  path: ['income'],
}).refine((fields) => {
  if (fields.taxGroup !== TaxGroup.GENERAL) {
    return true;
  }

  return fields.expenses !== undefined;
}, {
  message: 'Поле expenses обов\'язкове для розрахунку загальної системи оподаткування.',
  path: ['expenses'],
}).refine((fields) => {
  if (fields.taxGroup !== TaxGroup.GENERAL) {
    return true;
  }

  if (fields.income && fields.expenses) {
    return fields.income >= fields.expenses;
  }

  return true;
}, {
  message: 'Поле expenses не може бути більшим за поле income.',
  path: ['expenses'],
});
