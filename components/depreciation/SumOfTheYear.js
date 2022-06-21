import { useState, useEffect } from 'react';
import DepreciationForm from '../DepreciationForm';
import { currencyFormatter } from '../../utils';
import { calculateSumOfTheYearDepreciation } from '../../lib/depreciation-formulas';

export default function SumOfTheYear() {
  const [depreciation, setDepreciation] = useState({});
  const [values, setValues] = useState({});

  useEffect(() => {
    setDepreciation(
      calculateSumOfTheYearDepreciation(values)
    );
  }, [values]);

  return (
    <div>
      <DepreciationForm
        className="grid grid-cols-3 space-y-0 gap-8 mb-8"
        onChange={(value) => setValues({ ...values, ...value })}
        schema={[
          {
            label: 'Asset Value',
            key: 'asset',
            placeholder: 'Input Asset Value',
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
        ]}
      />

      {(depreciation.rows && depreciation.rows.length > 0) ? (
        <>
          <div className="mb-5">Total Depreciation: <span className="text-[#61fbc0]">{currencyFormatter(depreciation.totalDepreciation)}</span></div>
          <table className="text-base">
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
                  <td className="py-2 px-4 border border-gray-300">{Number(row.depreciation_percent * 100).toFixed(0)}%</td>
                  <td className="py-2 px-4 border border-gray-300">{currencyFormatter(row.depreciation_expense)}</td>
                  <td className="py-2 px-4 border border-gray-300">{currencyFormatter(row.accumulated_depreciation)}</td>
                  <td className="py-2 px-4 border border-gray-300">{currencyFormatter(row.bv_end)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <div className="text-gray-400 mt-10">Enter a value to start calculating.</div>
      )}
    </div>
  )
}
