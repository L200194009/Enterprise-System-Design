import { useState, useEffect } from 'react';
import DepreciationForm from '../DepreciationForm';
import { currencyFormatter } from '../../utils';
import { calculateReducingBalance } from '../../lib/depreciation-formulas';

export default function ReducingBalance() {
  const [depreciation, setDepreciation] = useState({});
  const [values, setValues] = useState({});

  useEffect(() => {
    setDepreciation(
      calculateReducingBalance(values)
    );
  }, [values]);

  return (
    <div>
      <div className="md:grid md:grid-cols-12 md:gap-10">
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
                label: 'Asset Benefit',
                key: 'useful_life',
                placeholder: 'Asset Benefit (Year)',
                props: {
                  isAllowed: ({ floatValue }) => floatValue <= 100,
                },
              },
              {
                label: 'Depreciation Rate (%)',
                key: 'depreciation_rate',
                placeholder: 'Depreciation Rate',
              },
            ]}
          />
        </div>

        <div className="md:col-span-8">
          {(values.depreciation_rate && values.salvage && values.useful_life && values.asset) ? (
            <>
              <table className="text-base mt-8">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border border-gray-300">Year</th>
                    <th className="py-2 px-4 border border-gray-300">Early Year Book Value</th>
                    <th className="py-2 px-4 border border-gray-300">Amount of Depreciation</th>
                    <th className="py-2 px-4 border border-gray-300">Accumulated Depreciation</th>
                    <th className="py-2 px-4 border border-gray-300">End of Year Book Value</th>
                  </tr>
                </thead>
                <tbody>
                  {depreciation.rows.map((row) => (
                    <tr key={row.year}>
                      <td className="py-2 px-4 border border-gray-300 text-center">{row.year}</td>
                      <td className="py-2 px-4 border border-gray-300">{currencyFormatter(row.bv_start)}</td>
                      <td className="py-2 px-4 border border-gray-300">{currencyFormatter(row.depreciation_amount)}</td>
                      <td className="py-2 px-4 border border-gray-300">{currencyFormatter(row.accumulated_depreciation)}</td>
                      <td className="py-2 px-4 border border-gray-300">{currencyFormatter(row.bv_end)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            <div className="text-gray-400 mt-10 md:m-5">Enter a value to start calculating.</div>
          )}
        </div>
      </div>
    </div>
  )
}
