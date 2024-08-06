import React, { useState } from "react";

interface LocationInputProps {
  location: string;
  onLocationChange: (location: string) => void;
}

const LocationInput: React.FC<LocationInputProps> = ({
  location,
  onLocationChange,
}) => {
  const [inputValue, setInputValue] = useState(location);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    onLocationChange(newValue);
  };

  return (
    <div className="relative px-12 py-5 mr-9 ml-8 text-lg font-medium bg-white rounded shadow-sm text-zinc-950 max-md:px-5 max-md:mr-2.5 max-md:max-w-full">
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        className="w-full bg-transparent outline-none"
      />
    </div>
  );
};

export default LocationInput;
