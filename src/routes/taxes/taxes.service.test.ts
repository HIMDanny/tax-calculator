import { describe, expect, test } from 'bun:test';

import { TaxGroup } from '~/lib/enums/tax-group';
import { TaxRateName } from '~/lib/enums/tax-rate-name';

import { LIVING_WAGE, MINIMUM_WAGE } from './lib/constants/tax-rates';
import { calculateTax, getGroupTaxRate, getTaxRates } from './taxes.service';

describe('Tax Service', () => {
  describe('calculateTax', () => {
    // Test Group 1 path
    test('should calculate tax for Group 1', () => {
      const result = calculateTax({
        taxGroup: TaxGroup.GROUP1,
      });

      const expectedTaxRate = 0.1; // Assuming 10% for Group 1
      expect(result.taxAmount).toBe(Math.ceil(LIVING_WAGE * expectedTaxRate));
      expect(result.militaryContribution).toBe(0);
      expect(result.singleSocialContribution).toBe(0);
    });

    // Test Group 2 path
    test('should calculate tax for Group 2', () => {
      const result = calculateTax({
        taxGroup: TaxGroup.GROUP2,
      });

      const expectedTaxRate = 0.2; // Assuming 20% for Group 2
      expect(result.taxAmount).toBe(Math.ceil(MINIMUM_WAGE * expectedTaxRate));
      expect(result.militaryContribution).toBe(0);
      expect(result.singleSocialContribution).toBe(0);
    });

    // Test Group 3 paths
    test('should calculate tax for Group 3 without VAT', () => {
      const income = 10000;
      const result = calculateTax({
        taxGroup: TaxGroup.GROUP3,
        income,
        withVAT: false,
      });

      const expectedTaxRate = 0.05; // Assuming 5% for Group 3 without VAT
      expect(result.taxAmount).toBe(Math.ceil(income * expectedTaxRate));
      expect(result.militaryContribution).toBe(0);
      expect(result.singleSocialContribution).toBe(0);
    });

    test('should calculate tax for Group 3 with VAT', () => {
      const income = 10000;
      const result = calculateTax({
        taxGroup: TaxGroup.GROUP3,
        income,
        withVAT: true,
      });

      const expectedTaxRate = 0.03; // Assuming 3% for Group 3 with VAT
      expect(result.taxAmount).toBe(Math.ceil(income * expectedTaxRate));
      expect(result.militaryContribution).toBe(0);
      expect(result.singleSocialContribution).toBe(0);
    });

    test('should throw error for Group 3 without income', () => {
      expect(() =>
        calculateTax({
          taxGroup: TaxGroup.GROUP3,
        }),
      ).toThrow('Income is required for 3rd tax group.');
    });

    // Test General group paths
    test('should calculate tax for General group with income and expenses', () => {
      const income = 50000;
      const expenses = 10000;
      const result = calculateTax({
        taxGroup: TaxGroup.GENERAL,
        income,
        expenses,
      });

      const netIncome = income - expenses;
      const expectedTaxRate = 0.18; // Assuming 18% for General
      const expectedSSCRate = 0.22; // Assuming 22% for SSC
      const expectedMilitaryRate = 0.015; // Assuming 1.5% for military

      expect(result.taxAmount).toBe(Math.ceil(netIncome * expectedTaxRate));
      expect(result.militaryContribution).toBe(
        Math.ceil(netIncome * expectedMilitaryRate),
      );

      // SSC should be capped at 15 minimum wages
      const maxSSC = MINIMUM_WAGE * 15 * expectedSSCRate;
      const calculatedSSC = netIncome * expectedSSCRate;
      expect(result.singleSocialContribution).toBe(
        Math.ceil(Math.min(calculatedSSC, maxSSC)),
      );
    });

    test('should return zero taxes for General group without income', () => {
      const result = calculateTax({
        taxGroup: TaxGroup.GENERAL,
      });

      expect(result.taxAmount).toBe(0);
      expect(result.militaryContribution).toBe(0);
      expect(result.singleSocialContribution).toBe(0);
    });
  });

  describe('getTaxRates', () => {
    test('should return tax rates array', () => {
      const rates = getTaxRates();
      expect(Array.isArray(rates)).toBe(true);
      expect(rates.length).toBeGreaterThan(0);
    });
  });

  describe('getGroupTaxRate', () => {
    test('should return correct tax rate for Group 1', () => {
      const rate = getGroupTaxRate({
        taxGroup: TaxGroup.GROUP1,
        name: TaxRateName.SINGLE,
      });

      expect(rate).toBe(0.1); // 10% for Group 1
    });

    test('should return correct tax rate for Group 2', () => {
      const rate = getGroupTaxRate({
        taxGroup: TaxGroup.GROUP2,
        name: TaxRateName.SINGLE,
      });

      expect(rate).toBe(0.2); // 20% for Group 2
    });

    test('should return correct tax rate for Group 3 without VAT', () => {
      const rate = getGroupTaxRate({
        taxGroup: TaxGroup.GROUP3,
        name: TaxRateName.SINGLE,
        withVAT: false,
      });

      expect(rate).toBe(0.05); // 5% for Group 3 without VAT
    });

    test('should return correct tax rate for Group 3 with VAT', () => {
      const rate = getGroupTaxRate({
        taxGroup: TaxGroup.GROUP3,
        name: TaxRateName.SINGLE,
        withVAT: true,
      });

      expect(rate).toBe(0.03); // 3% for Group 3 with VAT
    });

    test('should return correct rates for General group', () => {
      const personalIncomeTax = getGroupTaxRate({
        taxGroup: TaxGroup.GENERAL,
        name: TaxRateName.PERSONAL_INCOME,
      });

      const sscRate = getGroupTaxRate({
        taxGroup: TaxGroup.GENERAL,
        name: TaxRateName.SINGLE_SOCIAL_CONTRIBUTION,
      });

      const militaryRate = getGroupTaxRate({
        taxGroup: TaxGroup.GENERAL,
        name: TaxRateName.MILITARY,
      });

      expect(personalIncomeTax).toBe(0.18); // 18% personal income tax
      expect(sscRate).toBe(0.22); // 22% SSC
      expect(militaryRate).toBe(0.015); // 1.5% military contribution
    });

    test('should throw error for non-existent tax group and rate combination', () => {
      expect(() =>
        getGroupTaxRate({
          taxGroup: TaxGroup.GROUP1,
          name: TaxRateName.MILITARY, // Invalid combination
        }),
      ).toThrow('Tax rate not found');
    });
  });
});
