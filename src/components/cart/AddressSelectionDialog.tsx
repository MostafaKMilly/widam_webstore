// components/AddressSelectionDialog.tsx
"use client";

import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Address, getAddresses, addAddress } from "@/lib/api/addresses";
import LocationSelection from "@/components/LocationSelection/LocationSelection";
import DefaultAddress from "../home/address/DefaultAddress";
import AddAddressDialog from "../home/address/AddAddressDialog";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface AddressSelectionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAddress: (address: Address) => void;
}

const AddressSelectionDialog: React.FC<AddressSelectionDialogProps> = ({
  isOpen,
  onClose,
  onSelectAddress,
}) => {
  const queryClient = useQueryClient();

  // State for dialogs and selected location
  const [isLocationDialogOpen, setIsLocationDialogOpen] = useState(false);
  const [isAddAddressDialogOpen, setIsAddAddressDialogOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{
    latitude: string;
    longitude: string;
    address: string;
  } | null>(null);

  // Fetch Addresses using useQuery
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
    onClose();
    setIsLocationDialogOpen(true);
  };

  // Handler for selecting an existing address
  const handleSelectExistingAddress = (address: Address) => {
    onSelectAddress(address);
    onClose();
  };

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={onClose}
        className="fixed z-50 inset-0 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="bg-white rounded-lg max-w-2xl w-full mx-auto z-20 p-8 relative shadow-lg">
            <Dialog.Title className="text-2xl font-semibold mb-6 text-center">
              Select Address
            </Dialog.Title>

            {/* Loading State */}
            {isLoading && (
              <p className="text-center text-gray-500">Loading addresses...</p>
            )}

            {/* Error State */}
            {isError && (
              <p className="text-center text-red-500 mb-4">
                Error fetching addresses: {error.message}
              </p>
            )}

            {/* Addresses List */}
            {!isLoading && !isError && addresses && addresses.length !== 0 && (
              <div className="max-h-80 overflow-y-auto mb-6">
                {addresses.map((address) => (
                  <button
                    key={address.address_id}
                    onClick={() => handleSelectExistingAddress(address)}
                    className="w-full text-left p-4 border rounded-lg mb-3 hover:bg-gray-100 transition-colors"
                  >
                    <DefaultAddress address={address} />
                  </button>
                ))}
              </div>
            )}

            {/* Add New Address Button */}
            <button
              onClick={handleAddNewAddress}
              className="w-full flex items-center max-w-xs self-center mx-auto  justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              <span className="mr-3 text-2xl">+</span> Add New Address
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label="Close"
            >
              &times;
            </button>
          </div>
        </div>
      </Dialog>

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

export default AddressSelectionDialog;
