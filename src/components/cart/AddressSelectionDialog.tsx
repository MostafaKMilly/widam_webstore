"use client";

import React, { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Address,
  getAddresses,
  updateAddress,
  deleteAddress,
  GetAddressesResponse,
  UpdateAddressResponse,
  UpdateAddressRequest,
  addAddress,
} from "@/lib/api/addresses";

import { Plus, XIcon } from "lucide-react";
import LocationSelection from "@/components/LocationSelection/LocationSelection";
import useUserStore from "@/lib/store/userStore";
import DefaultAddress from "../home/address/DefaultAddress";
import AddAddressDialog from "../home/address/AddAddressDialog";

interface AddressSelectionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddressSelected?: (addressId: string) => void; // New prop
}

const AddressSelectionDialog: React.FC<AddressSelectionDialogProps> = ({
  isOpen,
  onClose,
  onAddressSelected,
}) => {
  const queryClient = useQueryClient();
  const setUser = useUserStore((state) => state.setUser);
  const user = useUserStore((state) => state.user);

  const [isLocationDialogOpen, setIsLocationDialogOpen] = useState(false);
  const [isAddAddressDialogOpen, setIsAddAddressDialogOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{
    latitude: string;
    longitude: string;
    address: string;
  } | null>(null);

  const {
    data: addressesData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["addresses"],
    queryFn: () => getAddresses().then((res) => res?.data || []),
    refetchOnWindowFocus: false,
  });

  const updateAddressMutation = useMutation<
    UpdateAddressResponse,
    Error,
    UpdateAddressRequest
  >({
    mutationFn: (updatedAddress) =>
      updateAddress(updatedAddress).then((res) => res!),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
      if (user) {
        const updatedUser = {
          ...user,
          preferred_shipping_address: data.data,
        };
        setUser(updatedUser);
      }
      onClose();
    },
    onError: (error) => {
      console.error("Error updating address:", error);
    },
  });

  const addAddressMutation = useMutation({
    mutationFn: (newAddress: Omit<Address, "address_id">) =>
      addAddress(newAddress as any).then((res) => res?.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
    },
  });

  const deleteAddressMutation = useMutation({
    mutationFn: (addressId: string) => deleteAddress({ address_id: addressId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
    },
    onError: (error) => {
      console.error("Error deleting address:", error);
    },
  });

  const handleSelectDefault = (address: Address) => {
    const updatedUser = {
      ...user!,
      preferred_shipping_address: address,
    };

    onAddressSelected?.(address.address_id);

    setUser(updatedUser);
    onClose();
  };

  const handleDeleteAddress = async (addressId: string) => {
    try {
      await deleteAddressMutation.mutateAsync(addressId);
    } catch (error) {}
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
      }
    });
  };

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

  const handleOpenLocationSelection = () => {
    setIsLocationDialogOpen(true);
  };

  const handleCloseLocationSelection = () => {
    setIsLocationDialogOpen(false);
  };

  const handleCloseAddAddressDialog = () => {
    setIsAddAddressDialogOpen(false);
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={onClose}>
          {/* Overlay */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-30"
            leave="ease-in duration-200"
            leaveFrom="opacity-30"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black opacity-30" />
          </Transition.Child>

          {/* Modal Content */}
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-3xl transform  rounded-lg border border-solid bg-neutral-50 border-zinc-100 shadow-[0px_7px_11px_rgba(0,0,0,0.051)] max-md:px-5 max-md:max-w-full p-4 text-left align-middle  transition-all relative">
                  <div className="absolute -top-5 -right-5 m-2">
                    <button
                      onClick={onClose}
                      className="bg-black rounded-full p-2 flex items-center justify-center"
                    >
                      <XIcon className="h-4 w-4 text-white" />
                    </button>
                  </div>
                  <main className="flex flex-col rounded-none max-w-full">
                    <section className="flex flex-col items-start px-14 pt-4 pb-20 w-full ">
                      <h1 className="text-2xl font-bold text-neutral-800 capitalize">
                        Select your address
                      </h1>
                      <button
                        onClick={handleOpenLocationSelection}
                        className="flex items-center w-full justify-center  px-16 py-4 mt-10 text-2xl font-semibold text-center text-sky-500 bg-white rounded-sm border border-stone-300 hover:bg-sky-100 max-md:px-5 max-md:max-w-full"
                        aria-label="Add New Address"
                      >
                        <Plus className="mr-2" />
                        Add New Address
                      </button>
                      <h2 className="mt-12 text-2xl font-semibold text-neutral-800 max-md:mt-10 capitalize">
                        Existing Addresses ({addressesData?.length || 0})
                      </h2>
                      {/* Loading State */}
                      {isLoading && (
                        <p className="text-center text-gray-500">
                          Loading addresses...
                        </p>
                      )}

                      {/* Error State */}
                      {isError && (
                        <p className="text-center text-red-500">
                          Error fetching addresses: {error.message}
                        </p>
                      )}

                      {/* Addresses List */}
                      {!isLoading &&
                        !isError &&
                        addressesData &&
                        addressesData.length > 0 && (
                          <div className="space-y-4 mt-4 w-full">
                            {addressesData.map((address) => (
                              <DefaultAddress
                                key={address.address_id}
                                address={address}
                                isSelected={
                                  user?.preferred_shipping_address
                                    ? user.preferred_shipping_address
                                        .address_id === address.address_id
                                    : false
                                }
                                onSelect={handleSelectDefault}
                                /*   onDelete={() =>
                                  handleDeleteAddress(address.address_id)
                                } */
                              />
                            ))}
                          </div>
                        )}

                      {/* No Addresses */}
                      {!isLoading &&
                        !isError &&
                        addressesData &&
                        addressesData.length === 0 && (
                          <p className="text-center text-gray-500">
                            No addresses found.
                          </p>
                        )}
                    </section>
                  </main>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* LocationSelection Dialog for Adding New Address */}
      <LocationSelection
        isOpen={isLocationDialogOpen}
        onClose={handleCloseLocationSelection}
        onSelectLocation={handleLocationSelect}
      />

      {/* AddAddressDialog for Adding New Address */}
      <AddAddressDialog
        isOpen={isAddAddressDialogOpen}
        onClose={handleCloseAddAddressDialog}
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
