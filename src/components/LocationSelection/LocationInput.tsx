import React, { useState, useRef } from "react";
import { Combobox, ComboboxOption, ComboboxOptions } from "@headlessui/react";
import { XIcon } from "lucide-react";

interface LocationInputProps {
  location: string;
  onLocationChange: (location: string) => void;
  onSelectLocation: (placeId: string) => void;
}

const LocationInput: React.FC<LocationInputProps> = ({
  location,
  onLocationChange,
  onSelectLocation,
}) => {
  const [inputValue, setInputValue] = useState(location);
  const [suggestions, setSuggestions] = useState<
    google.maps.places.AutocompletePrediction[]
  >([]);
  const autocompleteService =
    useRef<google.maps.places.AutocompleteService | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    onLocationChange(newValue);

    if (!autocompleteService.current) {
      autocompleteService.current =
        new google.maps.places.AutocompleteService();
    }

    if (newValue) {
      autocompleteService.current.getPlacePredictions(
        { input: newValue },
        (predictions, status) => {
          if (
            status === google.maps.places.PlacesServiceStatus.OK &&
            predictions
          ) {
            setSuggestions(predictions);
          } else {
            setSuggestions([]);
          }
        }
      );
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (placeId: string, description: string) => {
    setInputValue(description);
    setSuggestions([]);
    onSelectLocation(placeId); // Notify parent component
  };

  const handleClear = () => {
    setInputValue("");
    setSuggestions([]);
    onLocationChange("");
  };

  return (
    <div className="relative w-full">
      <Combobox value={inputValue} onChange={() => {}}>
        <div className="relative w-full mt-16 px-12 py-5 mr-9 text-lg font-medium bg-white rounded shadow-sm text-zinc-950 max-md:px-5 max-md:mr-2.5">
          <Combobox.Input
            as="input"
            type="text"
            value={inputValue}
            onChange={handleChange}
            className="w-full bg-transparent outline-none"
            placeholder="Search location"
          />
          {inputValue && (
            <button
              type="button"
              className="absolute right-4 top-1/2 transform -translate-y-1/2"
              onClick={handleClear}
            >
              <XIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>

        {suggestions.length > 0 && (
          <ComboboxOptions className="absolute w-full max-h-60 overflow-auto bg-white border border-gray-200 rounded shadow-lg z-10 mt-2">
            {suggestions.map((suggestion) => (
              <ComboboxOption
                key={suggestion.place_id}
                value={suggestion.place_id}
                className="cursor-pointer select-none p-2 text-left hover:bg-blue-600 hover:text-white"
                onMouseDown={() => {
                  handleSelect(suggestion.place_id, suggestion.description);
                }}
              >
                {suggestion.description}
              </ComboboxOption>
            ))}
          </ComboboxOptions>
        )}
      </Combobox>
    </div>
  );
};

export default LocationInput;