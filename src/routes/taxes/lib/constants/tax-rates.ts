import type { TaxRate } from '~/routes/taxes/tax-rate.schemas';

import { TaxGroup } from '~/lib/enums/tax-group';
import { TaxRateName } from '~/lib/enums/tax-rate-name';

/**
 * Мінімальна заробітна плата
 */
export const MINIMUM_WAGE = 800000;

/**
 * Прожитковий мінімум
 */
export const LIVING_WAGE = 302800;

/**
 * Податкова ставка
 */
export const TAX_RATES: TaxRate[] = [
  {
    id: crypto.randomUUID(),
    taxGroup: TaxGroup.GROUP1,
    name: TaxRateName.SINGLE,
    rate: 0.1,
    calculationBase: 'Прожитковий мінімум',
  },
  {
    id: crypto.randomUUID(),
    taxGroup: TaxGroup.GROUP2,
    name: TaxRateName.SINGLE,
    rate: 0.2,
    calculationBase: 'Мінімальна заробітна плата',
  },
  {
    id: crypto.randomUUID(),
    taxGroup: TaxGroup.GROUP3,
    name: TaxRateName.SINGLE,
    rate: 0.03,
    calculationBase: 'Дохід (для ФОП з ПДВ)',
    meta: {
      withVAT: true,
    },
  },
  {
    id: crypto.randomUUID(),
    taxGroup: TaxGroup.GROUP3,
    name: TaxRateName.SINGLE,
    rate: 0.05,
    calculationBase: 'Дохід (для ФОП без ПДВ)',
    meta: {
      withVAT: false,
    },
  },
  {
    id: crypto.randomUUID(),
    taxGroup: TaxGroup.GENERAL,
    name: TaxRateName.PERSONAL_INCOME,
    rate: 0.18,
    calculationBase: 'Чистий оподатковуваний дохід',
  },
  {
    id: crypto.randomUUID(),
    taxGroup: TaxGroup.GENERAL,
    name: TaxRateName.MILITARY,
    rate: 0.015,
    calculationBase: 'Чистий оподатковуваний дохід',
  },
  {
    id: crypto.randomUUID(),
    taxGroup: TaxGroup.GENERAL,
    name: TaxRateName.SINGLE_SOCIAL_CONTRIBUTION,
    rate: 0.22,
    calculationBase: 'Чистий оподатковуваний дохід',
  },
];
