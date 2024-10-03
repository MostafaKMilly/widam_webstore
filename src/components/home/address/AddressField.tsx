// AddressField.tsx
import React from "react";

interface AddressFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

const AddressField: React.FC<AddressFieldProps> = ({
  label,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div className="mt-9">
      <label
        htmlFor={label.toLowerCase().replace(" ", "-")}
        className="text-xl font-bold text-neutral-950 block mb-2"
      >
        {label}
      </label>
      <input
        type="text"
        id={label.toLowerCase().replace(" ", "-")}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="text-lg font-medium text-neutral-500 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
      />
      <div className="shrink-0 self-stretch mt-2.5 w-full h-0 border border-sky-900 border-solid max-md:mr-1" />
    </div>
  );
};

export default AddressField;
