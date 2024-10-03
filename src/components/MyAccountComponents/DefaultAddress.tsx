// DefaultAddress.tsx
"use client";

import React, { useState } from "react";
import { Address, getAddresses, addAddress } from "@/lib/api/addresses";

import LocationSelection from "@/components/LocationSelection/LocationSelection";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AddAddressDialog from "../home/address/AddAddressDialog";
import DefaultAddress from "../home/address/DefaultAddress";

const AddressComponent: React.FC = () => {
  const queryClient = useQueryClient();

  // State for dialogs and selected location
  const [isLocationDialogOpen, setIsLocationDialogOpen] = useState(false);
  const [isAddAddressDialogOpen, setIsAddAddressDialogOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{
    latitude: string;
    longitude: string;
    address: string; // Store address here
  } | null>(null);

  const {
    data: addresses,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["addresses"],
    queryFn: () => getAddresses().then((res) => res?.data),
    // Refetch on window focus
    refetchOnWindowFocus: false,
  });

  const addAddressMutation = useMutation({
    mutationFn: (newAddress: Omit<Address, "address_id">) =>
      addAddress(newAddress as any).then((res) => res?.data),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
    },
  });

  // Handler for adding a new address
  const handleAddAddress = async (
    newAddress: Omit<Address, "address_id">
  ): Promise<void> => {
    try {
      await addAddressMutation.mutateAsync(newAddress);
      // The dialog will close upon successful addition
      setIsAddAddressDialogOpen(false);
    } catch (error) {
      console.error("Error adding address:", error);
      // Handle error appropriately, e.g., show a notification
      throw error; // Propagate the error to the dialog
    }
  };

  // Handler for selecting a location
  const handleLocationSelect = (latitude: string, longitude: string) => {
    // Use reverse geocoding to get the address
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

  // Handler for opening the Add New Address dialog
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
        {/* Loading State */}
        {isLoading && (
          <p className="text-center text-gray-500">Loading addresses...</p>
        )}

        {/* Error State */}
        {isError && (
          <p className="text-center text-red-500">
            Error fetching addresses: {error.message}
          </p>
        )}

        {/* Addresses List */}
        {!isLoading && !isError && addresses && addresses.length !== 0 && (
          <div>
            <p className="mb-2">Existing Addresses ({addresses.length})</p>
            {addresses.map((address) => (
              <DefaultAddress key={address.address_id} address={address} />
            ))}
          </div>
        )}

        {/* Add New Address Button */}
        <button
          onClick={handleAddNewAddress}
          className="mt-4 w-full flex items-center justify-center px-4 py-2 text-[#0055bb] text-lg font-semibold font-Montserrat focus:outline-none focus:ring-2 focus:ring-blue-400 transition-transform duration-150 active:scale-95"
        >
          <span className="mr-2 text-2xl">+</span> Add New Address
        </button>
      </div>

      {/* Location Selection Dialog */}
      <LocationSelection
        isOpen={isLocationDialogOpen}
        onClose={() => setIsLocationDialogOpen(false)}
        onSelectLocation={handleLocationSelect}
        initialLocation={selectedLocation || { latitude: "", longitude: "" }}
      />

      {/* Add Address Dialog */}
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
