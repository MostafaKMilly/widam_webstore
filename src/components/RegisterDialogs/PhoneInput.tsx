// PhoneInput.tsx
import React, { useState, useEffect } from "react";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
}

const PhoneInput: React.FC<PhoneInputProps> = ({ value, onChange }) => {
  const [error, setError] = useState<string>("");

  // Regular expression to validate Qatari phone numbers
  const qatarPhoneRegex = /^[3-6]\d{7}$/;

  // Validate the phone number whenever it changes
  useEffect(() => {
    if (value === "") {
      setError("");
    } else if (!/^\d+$/.test(value)) {
      setError("Phone number must contain only digits.");
    } else if (value.length !== 8) {
      setError("Phone number must be exactly 8 digits.");
    } else if (!qatarPhoneRegex.test(value)) {
      setError("Phone number must start with 3, 4, 5, or 6.");
    } else {
      setError("");
    }
  }, [value]);

  // Handle input changes with validation
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    // Allow only digits and limit to 8 characters
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
          alt="Country flag"
        />
        <span className="text-lg font-semibold text-neutral-700 mr-2">
          +974
        </span>
        <input
          type="tel"
          className={`flex-1 text-lg font-medium text-neutral-500 bg-transparent border-b ${
            error ? "border-red-500" : "border-neutral-300"
          } focus:outline-none focus:border-blue-500`}
          placeholder="Enter your mobile no."
          aria-label="Enter your mobile number"
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
