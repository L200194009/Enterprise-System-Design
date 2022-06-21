import { range } from '../utils';

export const calculateStraightLineDepreciation = (values) => {
  const depreciationPerAnnual = (values.asset - values.salvage) / values.useful_life;

  return {
    depreciationPerAnnual,
    rows: range(values.useful_life).map((_, i) => {
      const year = i + 1;
      const accumulated_depreciation = depreciationPerAnnual * year;
      const bv_start = values.asset - (depreciationPerAnnual * i);
      const bv_end = values.asset - accumulated_depreciation;

      return {
        year,
        bv_start,
        bv_end,
        accumulated_depreciation,
      }
    })
  };
};

export const calculateReducingBalance = (values) => {
  return {
    rows: range(values.useful_life).reduce((accumulator, _, i) => {
      const lastBookValue = accumulator[i - 1]?.bv_end;
      const lastAccumulatedDepreciation = accumulator[i - 1]?.accumulated_depreciation ?? 0;

      const bv_start = lastBookValue ?? values.asset;
      const depreciation_amount = (bv_start - values.salvage) * (values.depreciation_rate / 100);
      const bv_end = bv_start - depreciation_amount;
      const accumulated_depreciation = depreciation_amount + lastAccumulatedDepreciation;

      accumulator.push({
        year: i + 1,
        bv_start,
        bv_end,
        accumulated_depreciation,
        depreciation_amount,
      });

      return accumulator;
    }, []),
  }
};

export const calculateSumOfTheYearDepreciation = (values) => {
  const totalDepreciation = values.asset - values.salvage;
  const sumOfTheYear = range(values.useful_life).reduce((total, _, i) => total += (i + 1), 0);

  return {
    totalDepreciation,
    rows: range(values.useful_life).reduce((accumulator, _, i) => {
      const lastAccumulatedDepreciation = accumulator[i - 1]?.accumulated_depreciation ?? 0;
      
      const year = i + 1;
      const depreciation_percent = (values.useful_life - i) / sumOfTheYear;
      const depreciation_expense = Math.round(totalDepreciation * depreciation_percent);
      const accumulated_depreciation = depreciation_expense + lastAccumulatedDepreciation;
      const bv_start = values.asset;
      const bv_end = values.asset - accumulated_depreciation;

      accumulator.push({
        year,
        bv_start,
        bv_end,
        depreciation_percent,
        depreciation_expense,
        accumulated_depreciation,
      });

      return accumulator;
    }, []),
  }
};

export const calculateUnitOfActivityDepreciation = (values) => {
  const depreciation_base = (values.asset - values.salvage);
  const depreciation_per_unit = depreciation_base / values.useful_unit;
  const depreciation_for_period = values.unit_used * depreciation_per_unit;

  return { depreciation_base, depreciation_per_unit, depreciation_for_period };
};
