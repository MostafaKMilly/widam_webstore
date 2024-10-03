"use client";

import React, { useEffect, useState } from "react";
import { Dialog, Switch } from "@headlessui/react";
import { Briefcase, Building, Home, XIcon } from "lucide-react";
import { Address } from "@/lib/api/addresses";

// AddressField Component with Bottom Border
const AddressField = React.memo(function AddressField({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  const id = label ? label.toLowerCase().replace(/ /g, "-") : undefined;
  return (
    <div className="mt-4">
      {label && (
        <label htmlFor={id} className="block text-sm font-normal text-black ">
          {label}
        </label>
      )}

      <input
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-full border-b-2 border-gray-300 focus:outline-none focus:border-sky-500 transition-colors duration-200"
      />
    </div>
  );
});

// AddressLabel Component
const AddressLabelComponent: React.FC<{
  selectedLabel: string;
  onSelectLabel: (label: string) => void;
}> = ({ selectedLabel, onSelectLabel }) => {
  const labels = [
    {
      text: "Villa",
      icon: Home, // Lucide Home icon
    },
    {
      text: "Office",
      icon: Briefcase, // Lucide Briefcase icon
    },
    {
      text: "Apartment",
      icon: Building, // Lucide Building icon
    },
  ];

  return (
    <div className="flex flex-wrap gap-3 mt-4">
      {labels.map((label) => {
        const IconComponent = label.icon;
        return (
          <button
            key={label.text} // Use label text as key for uniqueness
            onClick={() => onSelectLabel(label.text)}
            className={`flex items-center gap-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 ${
              selectedLabel === label.text
                ? "bg-sky-50 border-sky-500 text-sky-600"
                : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            <IconComponent className="w-5 h-5" /> {/* Render the Lucide Icon */}
            <span>{label.text}</span>
          </button>
        );
      })}
    </div>
  );
};

interface AddAddressDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddAddress: (newAddress: Omit<Address, "address_id">) => Promise<void>;
  initialLocation: {
    latitude: string;
    longitude: string;
    address: string;
  };
  handleEditLocation?: () => void;
  isLoading: boolean;
}

const AddAddressDialog: React.FC<AddAddressDialogProps> = ({
  isOpen,
  onClose,
  onAddAddress,
  initialLocation,
  handleEditLocation,
  isLoading,
}) => {
  // Form state
  const [addressTitle, setAddressTitle] = useState<string>("");
  const [zoneNumber, setZoneNumber] = useState<string>("");
  const [streetNo, setStreetNo] = useState<string>("");
  const [buildingNo, setBuildingNo] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [mobileNo, setMobileNo] = useState<string>("");
  const [selectedLabel, setSelectedLabel] = useState<string>("Villa");
  const [isDefaultAddress, setIsDefaultAddress] = useState<boolean>(false);
  const currentLocation = initialLocation;

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async () => {
    // Basic validation
    if (
      !addressTitle ||
      !zoneNumber ||
      !streetNo ||
      !buildingNo ||
      !fullName ||
      !mobileNo ||
      !selectedLabel
    ) {
      setErrorMessage("Please fill out all required fields.");
      return;
    }

    const newAddress: Omit<Address, "address_id"> = {
      address_title: addressTitle,
      address_type: selectedLabel,
      street_no: streetNo,
      building_no: buildingNo,
      city: "", // Adjust if needed
      zone: zoneNumber,
      area: "", // Adjust if needed
      country: "", // Adjust if needed
      latitude: currentLocation.latitude,
      longitude: currentLocation.longitude,
      phone: mobileNo,
      email_id: "", // Adjust if needed
      is_shipping_address: isDefaultAddress ? 1 : 0,
      full_name: fullName,
      landmark: "", // Adjust if needed
    };

    setIsSubmitting(true);
    setErrorMessage(""); // Clear previous errors

    try {
      await onAddAddress(newAddress); // Await the API call
      setIsSubmitting(false);
      onClose(); // Close the dialog upon success
      handleReset();
    } catch (error: any) {
      console.error("Error adding address:", error);
      setErrorMessage(
        error.message || "Failed to add address. Please try again."
      );
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setAddressTitle("");
    setZoneNumber("");
    setStreetNo("");
    setBuildingNo("");
    setFullName("");
    setMobileNo("");
    setSelectedLabel("Villa");
    setIsDefaultAddress(false);
    setErrorMessage("");
    setIsSubmitting(false);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        onClose();
        handleReset();
      }}
      className="relative z-50"
    >
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Dialog Panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="relative w-full max-w-3xl bg-white rounded-lg shadow-xl overflow-y-auto max-h-full p-6">
          {/* Close Button */}
          <button
            onClick={() => {
              onClose();
              handleReset();
            }}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            aria-label="Close dialog"
            disabled={isSubmitting} // Disable close button while submitting
          >
            <XIcon className="h-6 w-6" />
          </button>

          {/* Dialog Title */}
          <Dialog.Title className="text-2xl font-semibold text-sky-700 mb-4">
            Add New Address
          </Dialog.Title>

          {/* Map Display */}
          <div className="mb-6">
            <div className="relative h-64 w-full rounded-lg overflow-hidden">
              {/* Embed Google Maps */}
              <iframe
                title="Selected Location"
                src={`https://www.google.com/maps/embed/v1/view?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}&center=${currentLocation.latitude},${currentLocation.longitude}&zoom=15`}
                className="w-full h-full"
                allowFullScreen
              ></iframe>
            </div>

            {/* Display the human-readable address */}
            <div className="mt-4 flex justify-between items-center">
              <span className="text-[#444444] text-md font-medium">
                {currentLocation.address}
              </span>

              {handleEditLocation && (
                <button
                  onClick={handleEditLocation}
                  className="text-[#004990] text-md font-bold"
                  disabled={isSubmitting} // Disable edit button while submitting
                >
                  Edit
                </button>
              )}
            </div>
          </div>
          {/* Address Form Fields */}
          <div className="space-y-4">
            {/* Address Title */}
            <div className="text-[#0b0a0a] text-xl font-bold font-['Montserrat']">
              Address Title
            </div>

            <AddressField
              label=""
              placeholder="Address Title" // Omitted label
              value={addressTitle}
              onChange={setAddressTitle}
            />

            {/* Address Details */}
            <div className="pt-4">
              <div className="text-[#0b0a0a] text-xl font-bold font-['Montserrat']">
                Address Details
              </div>

              <AddressField
                label="Zone Number"
                placeholder="Enter your zone number"
                value={zoneNumber}
                onChange={setZoneNumber}
              />
              <AddressField
                label="Street No."
                placeholder="Enter your street number"
                value={streetNo}
                onChange={setStreetNo}
              />
              <AddressField
                label="Building No."
                placeholder="Enter your building number"
                value={buildingNo}
                onChange={setBuildingNo}
              />
            </div>

            <div className="flex items-center justify-between mt-4">
              <span className="text-sm font-medium text-gray-700">
                Make This Default
              </span>
              <Switch
                checked={isDefaultAddress}
                onChange={setIsDefaultAddress}
                className={`${
                  isDefaultAddress ? "bg-sky-500" : "bg-slate-300"
                } relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-300`}
              >
                <span
                  className={`${
                    isDefaultAddress ? "translate-x-6" : "translate-x-1"
                  } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                />
              </Switch>
            </div>

            {/* Receiver Information */}
            <div className="text-[#0b0a0a] text-xl font-bold font-['Montserrat']">
              Receiver Information
            </div>

            <AddressField
              label="Full Name"
              placeholder="Enter full name"
              value={fullName}
              onChange={setFullName}
            />

            {/* Mobile Number with Qatar Flag */}
            <div className="mt-4">
              <label
                htmlFor="mobile-no"
                className="block text-sm font-medium text-gray-700"
              >
                Mobile No.
              </label>
              <div className="mt-1 flex items-center border-b-2 border-gray-300 focus-within:border-sky-500 transition-colors duration-200">
                {/* Qatar Flag and Country Code */}
                <div className="flex items-center">
                  <img
                    src="https://flagcdn.com/w20/qa.png"
                    alt="Qatar Flag"
                    className="w-5 h-3 mr-2"
                  />
                  <span className="text-gray-700 font-medium">+974</span>
                </div>
                {/* Mobile Number Input */}
                <input
                  type="tel"
                  id="mobile-no"
                  value={mobileNo}
                  onChange={(e) => setMobileNo(e.target.value)}
                  className="flex-grow px-2 py-2 text-base font-medium text-gray-700 focus:outline-none"
                  placeholder="Enter mobile number"
                />
              </div>
            </div>

            {/* Address Label */}
            <h2 className="text-[#0b0a0a] text-xl font-bold font-['Montserrat']">
              Address Label
            </h2>
            <AddressLabelComponent
              selectedLabel={selectedLabel}
              onSelectLabel={setSelectedLabel}
            />
          </div>

          {/* Error Message */}
          {errorMessage && (
            <p className="mt-4 text-red-500 text-sm text-center">
              {errorMessage}
            </p>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || isLoading}
            className={`mt-8 w-full h-10 mx-auto flex items-center justify-center bg-primary text-white font-semibold max-w-[250px]  hover:bg-primary focus:outline-none focus:ring-2  focus:ring-opacity-50 self-center ${
              isSubmitting || isLoading ? "bg-slate-300 cursor-not-allowed" : ""
            } `}
          >
            {isSubmitting || isLoading ? "Adding Address..." : "Add Address"}
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default AddAddressDialog;
