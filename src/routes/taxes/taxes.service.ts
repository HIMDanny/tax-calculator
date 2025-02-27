import type { ValueOf } from '~/lib/types/value-of';

import { TaxGroup } from '~/lib/enums/tax-group';
import { TaxRateName } from '~/lib/enums/tax-rate-name';

import { LIVING_WAGE, MINIMUM_WAGE, TAX_RATES } from './lib/constants/tax-rates';

export function getGroupTaxRate({
  taxGroup,
  name,
  withVAT = false,
}: {
  taxGroup: ValueOf<typeof TaxGroup>;
  name: ValueOf<typeof TaxRateName>;
  withVAT?: boolean;
}): number {
  const tax = TAX_RATES.find((rate) => {
    if (taxGroup === TaxGroup.GROUP3) {
      return withVAT === rate.meta?.withVAT;
    }

    return rate.taxGroup === taxGroup && rate.name === name;
  });

  if (!tax) {
    throw new Error(`Tax rate not found. Requested tax group: ${taxGroup}. Requested tax rate: ${name}.`);
  }

  return tax.rate;
}

export function calculateTax({
  taxGroup,
  income,
  expenses,
  withVAT = false,
}: {
  taxGroup: ValueOf<typeof TaxGroup>;
  withVAT?: boolean;
  income?: number;
  expenses?: number;
}): {
    taxAmount: number;
    militaryContribution: number;
    singleSocialContribution: number;
  } {
  let taxAmount = 0;
  let militaryContribution = 0;
  let singleSocialContribution = 0;

  switch (taxGroup) {
    case TaxGroup.GROUP1: {
      const taxRate = getGroupTaxRate({
        taxGroup,
        name: TaxRateName.SINGLE,
      });

      taxAmount = taxRate * LIVING_WAGE;

      break;
    }
    case TaxGroup.GROUP2: {
      const taxRate = getGroupTaxRate({
        taxGroup,
        name: TaxRateName.SINGLE,
      });

      taxAmount = taxRate * MINIMUM_WAGE;
      break;
    }
    case TaxGroup.GROUP3: {
      if (!income) {
        throw new Error('Income is required for 3rd tax group.');
      }

      const taxRate = getGroupTaxRate({
        taxGroup,
        name: TaxRateName.SINGLE,
        withVAT,
      });

      taxAmount = taxRate * income;
      break;
    }
    case TaxGroup.GENERAL: {
      if (!income || expenses === undefined) {
        break;
      }

      const taxRate = getGroupTaxRate({
        taxGroup,
        name: TaxRateName.PERSONAL_INCOME,
      });
      const singleSocialContributionRate = getGroupTaxRate({
        taxGroup,
        name: TaxRateName.SINGLE_SOCIAL_CONTRIBUTION,
      });
      const militaryContributionRate = getGroupTaxRate({
        taxGroup,
        name: TaxRateName.MILITARY,
      });

      const netTaxableIncome = income - expenses;

      taxAmount = taxRate * netTaxableIncome;
      singleSocialContribution = Math.min(
        singleSocialContributionRate * netTaxableIncome,
        // The maximum single social contribution cannot exceed 22% of 15 minimum wages
        singleSocialContributionRate * MINIMUM_WAGE * 15,
      );
      militaryContribution = militaryContributionRate * netTaxableIncome;

      break;
    }

    default:
      break;
  }

  return {
    taxAmount: Math.ceil(taxAmount),
    militaryContribution: Math.ceil(militaryContribution),
    singleSocialContribution: Math.ceil(singleSocialContribution),
  };
}

export function getTaxRates() {
  return TAX_RATES;
}
