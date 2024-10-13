import { createRoute, z } from '@hono/zod-openapi';

import { HttpStatusCode } from '~/lib/enums/http-status-code';
import { jsonContent } from '~/lib/helpers/json-content';
import { GeneralTaxRateSchema, SimplifiedTaxRateSchema } from '~/schemas/tax-rate';

export const calculate = createRoute({
  method: 'post',
  path: '/calculate',
  request: {
    body: jsonContent('Calculate Tax Body', z.object({
      income: z.number().positive(),
      taxationSystem: z.enum(['simplified', 'general']),
      withVAT: z.boolean().optional(),
    })),
  },
  responses: {
    [HttpStatusCode.OK]: jsonContent('Calculate Tax', z.object({
      taxAmount: z.number().positive(),
      socialContribution: z.number().positive(),
      militaryContribution: z.number().min(0),
      totalTax: z.number().positive(),
    })),
  },
});

export type CalculateRouter = typeof calculate;

export const taxRates = createRoute({
  method: 'get',
  path: '/tax-rates',
  responses: {
    [HttpStatusCode.OK]: jsonContent('Get Tax Rates', z.object({
      simplified: z.object({
        group1: SimplifiedTaxRateSchema,
        group2: SimplifiedTaxRateSchema,
        group3: SimplifiedTaxRateSchema,
      }),
      general: GeneralTaxRateSchema,
    })),
  },
});

export type TaxRatesRouter = typeof taxRates;
