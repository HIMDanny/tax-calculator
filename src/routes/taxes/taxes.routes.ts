import { createRoute, z } from '@hono/zod-openapi';

import { HttpStatusCode } from '~/lib/enums/http-status-code';
import { TaxGroup } from '~/lib/enums/tax-group';
import { jsonContent } from '~/lib/helpers/json-content';
import { TaxRateSchema } from '~/routes/taxes/tax-rate.schemas';

const tags = ['Taxes'];

export const calculateTax = createRoute({
  method: 'post',
  path: '/calculate',
  tags,
  request: {
    body: jsonContent('Calculate Tax Body', z.object({
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
    })),
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
