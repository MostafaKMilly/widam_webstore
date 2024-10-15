"use client";

import React, { useState } from "react";
import { Address, getAddresses, addAddress } from "@/lib/api/addresses";

import LocationSelection from "@/components/LocationSelection/LocationSelection";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AddAddressDialog from "../home/address/AddAddressDialog";
import DefaultAddress from "../home/address/DefaultAddress";
import { useDictionary } from "@/lib/hooks/useDictionary";

const AddressComponent: React.FC = () => {
  const { dictionary } = useDictionary();
  const queryClient = useQueryClient();

  const [isLocationDialogOpen, setIsLocationDialogOpen] = useState(false);
  const [isAddAddressDialogOpen, setIsAddAddressDialogOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{
    latitude: string;
    longitude: string;
    address: string;
  } | null>(null);

  const {
    data: addresses,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["addresses"],
    queryFn: () => getAddresses().then((res) => res?.data),
    refetchOnWindowFocus: false,
  });

  const addAddressMutation = useMutation({
    mutationFn: (newAddress: Omit<Address, "address_id">) =>
      addAddress(newAddress as any).then((res) => res?.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
    },
  });

  const handleAddAddress = async (
    newAddress: Omit<Address, "address_id">
  ): Promise<void> => {
    try {
      await addAddressMutation.mutateAsync(newAddress);
      setIsAddAddressDialogOpen(false);
    } catch (error) {
      console.error("Error adding address:", error);
      throw error;
    }
  };

  const handleLocationSelect = (latitude: string, longitude: string) => {
    const geocoder = new google.maps.Geocoder();
    const latLng = { lat: parseFloat(latitude), lng: parseFloat(longitude) };

    geocoder.geocode({ location: latLng }, (results, status) => {
      if (status === "OK" && results && results[0]) {
        const formattedAddress = results[0].formatted_address;
        setSelectedLocation({
          latitude,
          longitude,
          address: formattedAddress,
        });
        setIsLocationDialogOpen(false);
        setIsAddAddressDialogOpen(true);
      } else {
        console.error("Geocode was not successful: " + status);
      }
    });
  };

  const handleAddNewAddress = () => {
    setSelectedLocation(null);
    setIsLocationDialogOpen(true);
  };

  return (
    <>
      <div
        className="mt-4 pb-4"
        style={{
          borderRadius: "4px",
          border: "1px solid #ECECEC",
          background: "#FFF",
          boxShadow: "2px 2px 2.5px 0px rgba(0, 0, 0, 0.16)",
        }}
      >
        {isLoading && (
          <p className="text-center text-gray-500">
            {dictionary["loadingAddresses"]}
          </p>
        )}

        {isError && (
          <p className="text-center text-red-500">
            {dictionary["errorFetchingAddresses"]}: {error.message}
          </p>
        )}

        {!isLoading && !isError && addresses && addresses.length !== 0 && (
          <div>
            <p className="mb-2">
              {dictionary["existingAddresses"]} ({addresses.length})
            </p>
            {addresses.map((address) => (
              <DefaultAddress key={address.address_id} address={address} />
            ))}
          </div>
        )}

        <button
          onClick={handleAddNewAddress}
          className="mt-4 w-full flex items-center justify-center px-4 py-2 text-[#0055bb] text-lg font-semibold font-Montserrat focus:outline-none focus:ring-2 focus:ring-blue-400 transition-transform duration-150 active:scale-95"
        >
          <span className="mr-2 text-2xl">+</span> {dictionary["addNewAddress"]}
        </button>
      </div>

      <LocationSelection
        isOpen={isLocationDialogOpen}
        onClose={() => setIsLocationDialogOpen(false)}
        onSelectLocation={handleLocationSelect}
        initialLocation={selectedLocation || { latitude: "", longitude: "" }}
      />

      <AddAddressDialog
        isOpen={isAddAddressDialogOpen}
        onClose={() => setIsAddAddressDialogOpen(false)}
        onAddAddress={handleAddAddress}
        initialLocation={
          selectedLocation || { latitude: "", longitude: "", address: "" }
        }
        handleEditLocation={() => {
          setIsAddAddressDialogOpen(false);
          setIsLocationDialogOpen(true);
        }}
        isLoading={addAddressMutation.isPending}
      />
    </>
  );
};

export default AddressComponent;
