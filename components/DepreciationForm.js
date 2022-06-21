import clsx from 'clsx';
import NumberFormat from 'react-number-format';

export default function DepreciationForm({ className, schema, onChange }) {
  return (
    <div className={clsx('space-y-8', className)}>
      {schema.map((field) => (
        <div key={field.key}>
          <div className="mb-3 text-base text-gray-300">{field.label}</div>
          <NumberFormat
            onValueChange={(values) => onChange({ [field.key]: Number(values.value) })}
            className="w-full block text-gray-800 py-2 px-4 focus:outline-0 placeholder:text-lg"
            inputMode="numeric"
            placeholder={field.placeholder}
            {...field.props}
          />
        </div>
      ))}
    </div>
  )
}
