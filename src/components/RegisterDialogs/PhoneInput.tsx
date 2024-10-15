import React, { useState, useEffect } from "react";
import { useDictionary } from "@/lib/hooks/useDictionary";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
}

const PhoneInput: React.FC<PhoneInputProps> = ({ value, onChange }) => {
const { dictionary } = useDictionary();
  const [error, setError] = useState<string>("");

  const qatarPhoneRegex = /^[3-6]\d{7}$/;

  useEffect(() => {
    if (value === "") {
      setError("");
    } else if (!/^\d+$/.test(value)) {
      setError(dictionary["phoneDigitsOnly"]);
    } else if (value.length !== 8) {
      setError(dictionary["phoneExactDigits"]);
    } else if (!qatarPhoneRegex.test(value)) {
      setError(dictionary["phoneStartWith"]);
    } else {
      setError("");
    }
  }, [value, dictionary]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    if (/^\d{0,8}$/.test(inputValue)) {
      onChange(inputValue);
    }
  };

  return (
    <div className="flex flex-col items-start w-full">
      <div className="flex items-center px-6 py-4 mt-14 gap-x-2 rounded-sm bg-slate-100 max-md:px-5 max-md:mt-10 w-full">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/ed0033c9904d0b827f47e8a4ba0987c4f99dd0b523cf6d26947817f4387f16ba?placeholderIfAbsent=true&apiKey=9810db3822b54ab583e896edd833d595"
          className="w-12 h-auto rounded-sm object-contain mr-2"
          alt={dictionary["countryFlag"]}
        />
        <span className="text-lg font-semibold text-neutral-700 mr-2">
          +974
        </span>
        <input
          type="tel"
          className={`flex-1 text-lg font-medium text-neutral-500 bg-transparent border-b ${
            error ? "border-red-500" : "border-neutral-300"
          } focus:outline-none focus:border-blue-500`}
          placeholder={dictionary["enterPhonePlaceholder"]}
          aria-label={dictionary["enterPhoneLabel"]}
          value={value}
          onChange={handleInputChange}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? "phone-error" : undefined}
        />
      </div>
      {error && (
        <p id="phone-error" className="mt-2 text-sm text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default PhoneInput;
