import { createRoute, z } from '@hono/zod-openapi';

import { HttpStatusCode } from '~/lib/enums/http-status-code';
import { jsonContent } from '~/lib/helpers/json-content';
import { CalculateTaxBodySchema, TaxRateSchema } from '~/routes/taxes/taxes.schemas';

const tags = ['Taxes'];

export const calculateTax = createRoute({
  method: 'post',
  path: '/calculate',
  tags,
  request: {
    body: jsonContent('Calculate Tax Body', CalculateTaxBodySchema),
  },
  responses: {
    [HttpStatusCode.OK]: jsonContent('Calculated Taxes', z.object({
      singleSocialContribution: z.number().positive(),
      militaryContribution: z.number().min(0),
      taxAmount: z.number().positive(),
    })),
  },
});

export type CalculateTaxRouter = typeof calculateTax;

export const taxRates = createRoute({
  method: 'get',
  path: '/tax-rates',
  tags,
  responses: {
    [HttpStatusCode.OK]: jsonContent('The list of tax rates', z.array(TaxRateSchema)),
  },
});

export type TaxRatesRouter = typeof taxRates;
