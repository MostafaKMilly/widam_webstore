// components/DefaultAddress.tsx
"use client";

import React, {
  useEffect,
  useRef,
  useState,
  Fragment,
  CSSProperties,
} from "react";
import { Address } from "@/lib/api/addresses";
import { Trash2 } from "lucide-react"; // Removed CheckCircle import
import { Dialog, Transition } from "@headlessui/react";

interface DefaultAddressProps {
  address: Address;
  isSelected?: boolean; // Optional
  onSelect?: (address: Address) => void; // Optional
  onDelete?: () => void; // Optional
  className?: string;
  styles?: CSSProperties;
}

const DefaultAddress: React.FC<DefaultAddressProps> = ({
  address,
  isSelected = false,
  onSelect,
  onDelete,
  className,
  styles,
}) => {
  const { latitude, longitude } = address || {};
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  // State for confirmation dialog
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const initMap = (latitude: number, longitude: number) => {
    if (mapRef.current) {
      const googleMap = new google.maps.Map(mapRef.current, {
        center: { lat: latitude, lng: longitude },
        zoom: 15,
        zoomControl: false,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
        disableDefaultUI: true,
      });

      // Add a marker to the map
      new google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map: googleMap,
      });

      setMap(googleMap);
    }
  };

  useEffect(() => {
    if (latitude && longitude && !map) {
      initMap(parseFloat(latitude), parseFloat(longitude));
    }
  }, [latitude, longitude, map]);

  return (
    <div
      className={`px-3.5 py-4 mt-3.5 rounded-sm border ${
        isSelected ? "border-blue-500 bg-blue-50" : "border-zinc-100"
      } shadow-sm max-md:pr-5 max-md:max-w-full ${
        onSelect ? "cursor-pointer hover:bg-blue-50" : ""
      } ${className}`}
      onClick={() => {
        if (onSelect) {
          onSelect(address);
        }
      }}
      style={{
        border: isSelected ? "1px solid #05B" : "1px solid #ECECEC",
        boxShadow: isSelected
          ? "none"
          : "2px 2px 2.5px 0px rgba(0, 0, 0, 0.16)",
        ...styles,
      }}
    >
      <div className="flex justify-between gap-5 max-md:flex-col">
        <div className="flex flex-col max-md:ml-0 max-md:w-full">
          {latitude && longitude ? (
            <div
              ref={mapRef}
              className="object-contain shrink-0 rounded aspect-square w-[90px] max-md:mt-8"
              style={{ height: "110px", width: "100%" }}
            />
          ) : (
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/0e5fbc4621d8869acc215e7d10e93b96c1854d5878291bfbe42c7141eade7736?placeholderIfAbsent=true&apiKey=9810db3822b54ab583e896edd833d595"
              className="object-contain shrink-0 rounded aspect-square w-[90px] max-md:mt-8"
              alt="Address Icon"
            />
          )}
        </div>
        <div className="flex flex-col ml-5 w-4/5 max-md:ml-0 max-md:w-full">
          <div className="flex flex-col grow mt-1 text-base font-medium rounded-none max-md:mt-9">
            <div className="leading-5 text-neutral-700">
              <span className="text-xl font-semibold text-neutral-800">
                {address.address_title}
              </span>
              <br />
              <span className="text-neutral-800">{address.full_name}</span>
              <br />
              {address.building_no}, {address.street_no},{" "}
              {address.city.city_name}, {address.zone},{" "}
              {address.country.country_name}
            </div>
            <div className="self-start mt-1.5 text-sky-800">
              {address.phone}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {/* Removed CheckCircle Icon */}
          {onDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering onSelect
                setIsDialogOpen(true);
              }}
              className="text-red-500 hover:text-red-700"
              aria-label="Delete Address"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Transition appear show={isDialogOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => setIsDialogOpen(false)}
        >
          <div className="min-h-screen px-4 text-center">
            {/* Trick the browser into centering the modal */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>

            {/* Modal Content */}
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Delete Address
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Are you sure you want to delete this address? This action
                    cannot be undone.
                  </p>
                </div>

                <div className="mt-4 flex justify-end space-x-2">
                  <button
                    type="button"
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700"
                    onClick={() => {
                      onDelete?.();
                      setIsDialogOpen(false);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default DefaultAddress;
