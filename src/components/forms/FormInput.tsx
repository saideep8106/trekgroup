interface Props {
  label: string
  placeholder?: string
  type?: string
  name?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
  className?: string
}

function FormInput({ label, placeholder, type = "text", name, value, onChange, required, className }: Props) {

  return (
    <div className="flex flex-col gap-1">

      <label className="text-sm text-gray-600">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 ${className || ""}`}
      />

    </div>
  )

}

export default FormInput