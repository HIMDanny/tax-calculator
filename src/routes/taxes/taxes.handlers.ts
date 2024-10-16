import type { AppRouteHandler } from '~/lib/types/app-route-handler';

import { HttpStatusCode } from '~/lib/enums/http-status-code';

import type { CalculateTaxRouter, TaxRatesRouter } from './taxes.routes';

import * as taxService from './taxes.service';

export const calculateTax: AppRouteHandler<CalculateTaxRouter> = async (c) => {
  const taxInfo = c.req.valid('json');

  const {
    militaryContribution,
    singleSocialContribution,
    taxAmount,
  } = taxService.calculateTax(taxInfo);

  return c.json({
    taxAmount,
    militaryContribution,
    singleSocialContribution,
  }, HttpStatusCode.OK);
};

export const taxRates: AppRouteHandler<TaxRatesRouter> = (c) => {
  const taxRates = taxService.getTaxRates();

  return c.json(taxRates, HttpStatusCode.OK);
};
