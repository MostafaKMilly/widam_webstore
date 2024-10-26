"use client";

import React, { useEffect, useState } from "react";
import { Dialog, Switch } from "@headlessui/react";
import { Briefcase, Building, Home, XIcon } from "lucide-react";
import { Address } from "@/lib/api/addresses";
import { useDictionary } from "@/lib/hooks/useDictionary";

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
        <label htmlFor={id} className="block text-sm font-normal text-black">
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
  const { dictionary } = useDictionary();
  const labels = [
    {
      text: dictionary["Villa"],
      icon: Home, // Lucide Home icon
    },
    {
      text: dictionary["Office"],
      icon: Briefcase, // Lucide Briefcase icon
    },
    {
      text: dictionary["Apartment"],
      icon: Building, // Lucide Building icon
    },
  ];

  return (
    <div className="flex flex-wrap gap-3 mt-4">
      {labels.map((label) => {
        const IconComponent = label.icon;
        return (
          <button
            key={label.text}
            onClick={() => onSelectLabel(label.text)}
            className={`flex items-center gap-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 ${
              selectedLabel === label.text
                ? "bg-sky-50 border-sky-500 text-sky-600"
                : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            <IconComponent className="w-5 h-5" />
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
  const { dictionary } = useDictionary();

  // Form state
  const [addressTitle, setAddressTitle] = useState<string>("");
  const [zoneNumber, setZoneNumber] = useState<string>("");
  const [streetNo, setStreetNo] = useState<string>("");
  const [buildingNo, setBuildingNo] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [mobileNo, setMobileNo] = useState<string>("");
  const [selectedLabel, setSelectedLabel] = useState<string>(
    dictionary["Villa"]
  );
  const [isDefaultAddress, setIsDefaultAddress] = useState<boolean>(false);
  const currentLocation = initialLocation;
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (
      !addressTitle ||
      !zoneNumber ||
      !streetNo ||
      !buildingNo ||
      !fullName ||
      !mobileNo ||
      !selectedLabel
    ) {
      setErrorMessage(dictionary["pleaseSelect"]);
      return;
    }

    const newAddress: Partial<Omit<Address, "address_id">> = {
      address_title: addressTitle,
      address_type: selectedLabel,
      street_no: streetNo,
      building_no: buildingNo,
      city: {
        city_id: "",
        city_name: "",
      },
      zone: zoneNumber,
      area: {
        area_id: "",
        area_name: "",
      },
      country: {
        country_id: "",
        country_name: "",
      },
      latitude: currentLocation.latitude,
      longitude: currentLocation.longitude,
      phone: mobileNo,
      preferred_shipping_address: isDefaultAddress ? 1 : 0,
      full_name: fullName,
      landmark: "",
    };

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      await onAddAddress(newAddress as Address);
      setIsSubmitting(false);
      onClose();
      handleReset();
    } catch (error: any) {
      console.error("Error adding address:", error);
      setErrorMessage(error.message || dictionary["errorAddingAddress"]);
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
    setSelectedLabel(dictionary["Villa"]);
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
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="relative w-full max-w-3xl bg-white rounded-lg shadow-xl overflow-y-auto max-h-full p-6">
          <button
            onClick={() => {
              onClose();
              handleReset();
            }}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            aria-label={dictionary["closeDialog"]}
            disabled={isSubmitting}
          >
            <XIcon className="h-6 w-6" />
          </button>

          <Dialog.Title className="text-2xl font-semibold text-sky-700 mb-4">
            {dictionary["add_new_address"]}
          </Dialog.Title>

          <div className="mb-6">
            <div className="relative h-64 w-full rounded-lg overflow-hidden">
              <iframe
                title={dictionary["SelectedLocation"]}
                src={`https://www.google.com/maps/embed/v1/view?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}&center=${currentLocation.latitude},${currentLocation.longitude}&zoom=15`}
                className="w-full h-full"
                allowFullScreen
              ></iframe>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <span className="text-[#444444] text-md font-medium">
                {currentLocation.address}
              </span>

              {handleEditLocation && (
                <button
                  onClick={handleEditLocation}
                  className="text-[#004990] text-md font-bold"
                  disabled={isSubmitting}
                >
                  {dictionary["edit"]}
                </button>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-[#0b0a0a] text-xl font-bold font-montserrat">
              {dictionary["addressTitle"]}
            </div>

            <AddressField
              label=""
              placeholder={dictionary["addressTitle"]}
              value={addressTitle}
              onChange={setAddressTitle}
            />

            <div className="pt-4">
              <div className="text-[#0b0a0a] text-xl font-bold font-montserrat">
                {dictionary["addressDetails"]}
              </div>

              <AddressField
                label={dictionary["zoneNumber"]}
                placeholder={dictionary["enterZoneNumber"]}
                value={zoneNumber}
                onChange={setZoneNumber}
              />
              <AddressField
                label={dictionary["streetNo"]}
                placeholder={dictionary["enterStreetNumber"]}
                value={streetNo}
                onChange={setStreetNo}
              />
              <AddressField
                label={dictionary["buildingNo"]}
                placeholder={dictionary["enterBuildingNumber"]}
                value={buildingNo}
                onChange={setBuildingNo}
              />
            </div>

            <div className="flex items-center justify-between mt-4">
              <span className="text-sm font-medium text-gray-700">
                {dictionary["makeThisDefault"]}
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

            <div className="text-[#0b0a0a] text-xl font-bold font-montserrat">
              {dictionary["receiverInformation"]}
            </div>

            <AddressField
              label={dictionary["fullName"]}
              placeholder={dictionary["enterFullName"]}
              value={fullName}
              onChange={setFullName}
            />

            <div className="mt-4">
              <label
                htmlFor="mobile-no"
                className="block text-sm font-medium text-gray-700"
              >
                {dictionary["mobileNo"]}
              </label>
              <div className="mt-1 flex items-center border-b-2 border-gray-300 focus-within:border-sky-500 transition-colors duration-200">
                <div className="flex items-center">
                  <img
                    src="https://flagcdn.com/w20/qa.png"
                    alt={dictionary["qatarFlag"]}
                    className="w-5 h-3 mr-2"
                  />
                  <span className="text-gray-700 font-medium">+974</span>
                </div>
                <input
                  type="tel"
                  id="mobile-no"
                  value={mobileNo}
                  onChange={(e) => setMobileNo(e.target.value)}
                  className="flex-grow px-2 py-2 text-base font-medium text-gray-700 focus:outline-none"
                  placeholder={dictionary["enterMobileNumber"]}
                />
              </div>
            </div>

            <h2 className="text-[#0b0a0a] text-xl font-bold font-montserrat">
              {dictionary["addressLabel"]}
            </h2>
            <AddressLabelComponent
              selectedLabel={selectedLabel}
              onSelectLabel={setSelectedLabel}
            />
          </div>

          {errorMessage && (
            <p className="mt-4 text-red-500 text-sm text-center">
              {errorMessage}
            </p>
          )}

          <button
            onClick={handleSubmit}
            disabled={isSubmitting || isLoading}
            className={`mt-8 w-full h-10 mx-auto flex items-center justify-center bg-primary text-white font-semibold max-w-[250px] hover:bg-primary focus:outline-none focus:ring-2 focus:ring-opacity-50 self-center ${
              isSubmitting || isLoading ? "bg-slate-300 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting || isLoading
              ? dictionary["addingAddress"]
              : dictionary["add_new_address"]}
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default AddAddressDialog;
