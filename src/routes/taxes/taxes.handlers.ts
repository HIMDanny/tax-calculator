import type { RouteHandler } from '@hono/zod-openapi';

import type { TaxRatesRouter } from './taxes.routes';

export const taxRates: RouteHandler<TaxRatesRouter> = (c) => {
  return c.json({
    simplified: {
      group1: { taxRate: 0.05, socialContributionRate: 0.22 },
      group2: { taxRate: 0.03, socialContributionRate: 0.22 },
      group3: { taxRate: 0.02, socialContributionRate: 0.22 },
    },
    general: {
      taxRate: 0.18,
      socialContributionRate: 0.22,
      militaryContributionRate: 0.015,
    },
  });
};
