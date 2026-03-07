interface Props {
  label: string
  options: string[]
  name?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

function FormSelect({ label, options, name, value, onChange }: Props) {

  return (
    <div className="flex flex-col gap-1">

      <label className="text-sm text-gray-600">
        {label}
      </label>

      <select
        name={name}
        value={value}
        onChange={onChange}
        className="border rounded-lg px-3 py-2 bg-white outline-none focus:ring-2 focus:ring-blue-500"
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>

    </div>
  )

}

export default FormSelect