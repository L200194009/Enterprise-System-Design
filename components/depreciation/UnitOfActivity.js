import { useState, useEffect } from 'react';
import DepreciationForm from '../DepreciationForm';
import { currencyFormatter } from '../../utils';
import { calculateUnitOfActivityDepreciation } from '../../lib/depreciation-formulas';

export default function UnitOfActivity() {
  const [depreciation, setDepreciation] = useState({});
  const [values, setValues] = useState({});

  useEffect(() => {
    setDepreciation(
      calculateUnitOfActivityDepreciation(values)
    );
  }, [values]);
  
  return (
    <div>
      <div className="md:grid md:grid-cols-12 md:gap-6">
        <div className="md:col-span-4 mb-6">
          <DepreciationForm
            onChange={(value) => setValues({ ...values, ...value })}
            schema={[
              {
                label: 'Asset Value',
                key: 'asset',
                placeholder: 'Insert Asset Value',
                props: {
                  thousandSeparator: '.',
                  decimalSeparator: ',',
                  prefix: 'Rp ',
                },
              },
              {
                label: 'Residual Value',
                key: 'salvage',
                placeholder: 'Insert Residual Value',
                props: {
                  thousandSeparator: '.',
                  decimalSeparator: ',',
                  prefix: 'Rp ',
                },
              },
              {
                label: 'Usage Capacity (Units)',
                key: 'useful_unit',
                placeholder: 'Product Lifetime (hr, km, ltr, kg, etc)',
                props: {
                  thousandSeparator: '.',
                  decimalSeparator: ',',
                },
              },
              {
                label: 'Usage Period (Units)',
                key: 'unit_used',
                placeholder: 'Goods Usage Period (hr, km, ltr, kg, etc)',
                props: {
                  thousandSeparator: '.',
                  decimalSeparator: ',',
                },
              },
            ]}
          />
        </div>

        <div className="md:col-span-8">
          {(depreciation.depreciation_for_period) ? (
            <div className="space-y-5 m-7">
              <div>Depreciation Cost: <span className="text-[#61fbc0]">{currencyFormatter(depreciation.depreciation_for_period)}</span></div>
              <div>Depreciation Cost per unit: <span className="text-[#61fbc0]">{currencyFormatter(depreciation.depreciation_per_unit)}</span></div>
            </div>
          ) : (
            <div className="text-gray-400 m-5">Enter a value to start calculating.</div>
          )}
        </div>
      </div>
    </div>
  )
}
