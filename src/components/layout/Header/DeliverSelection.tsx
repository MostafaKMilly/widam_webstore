// components/DeliverSelection.tsx
"use client";

import React, { useEffect, useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { getUser } from "@/lib/api/profile";
// import { getAddresses } from "@/lib/api/addresses";
import { useDictionary } from "@/lib/hooks/useDictionary";
import LocationSelection from "@/components/LocationSelection/LocationSelection";
import { Plus } from "lucide-react";
import AddressSelectionDialog from "@/components/cart/AddressSelectionDialog";
import useUserStore from "@/lib/store/userStore";

const DeliverSelection: React.FC = () => {
  const [isLocationSelectionOpen, setIsLocationSelectionOpen] = useState(false);
  const [isAddressSelectionOpen, setIsAddressSelectionOpen] = useState(false);
  const { dictionary } = useDictionary();
  const [mounted, setMounted] = useState(false);

  const user = useUserStore((state) => state.user);

  const handleOpenLocationSelection = () => {
    setIsLocationSelectionOpen(true);
  };

  const handleCloseLocationSelection = () => {
    setIsLocationSelectionOpen(false);
  };

  const handleOpenAddressSelection = () => {
    setIsAddressSelectionOpen(true);
  };

  const handleCloseAddressSelection = () => {
    setIsAddressSelectionOpen(false);
  };

  useEffect(() => {
    const hasOpened = localStorage.getItem("hasOpenedDialog");
    if (!hasOpened && user?.preferred_shipping_address) {
      setIsAddressSelectionOpen(true);
      localStorage.setItem("hasOpenedDialog", "true");
    }
  }, [user]);

  const displayLocation = () => {
    return user?.preferred_shipping_address?.address_title || "Doha";
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div>
      <div
        className="flex items-center gap-2.5 cursor-pointer"
        onClick={() => {
          if (user?.preferred_shipping_address) {
            handleOpenAddressSelection();
          } else {
            handleOpenLocationSelection();
          }
        }}
      >
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/549e2d02a24238a076781bc3e6b93c72c473806eae1a3aef02a356e8589eb3ab?apiKey=9810db3822b54ab583e896edd833d595&&apiKey=9810db3822b54ab583e896edd833d595"
          alt="Delivery Icon"
          className="object-contain shrink-0 self-start aspect-[0.86] w-[30px]"
        />
        <div>
          <span className="text-white font-normal">
            {dictionary.deliver_to}
          </span>
          <br />

          <span className="font-semibold">
            {mounted ? displayLocation() : ""}
          </span>
        </div>
      </div>

      {/* AddressSelectionDialog for Authenticated Users */}
      {user?.preferred_shipping_address && mounted && (
        <AddressSelectionDialog
          isOpen={isAddressSelectionOpen}
          onClose={handleCloseAddressSelection}
        />
      )}

      {/* LocationSelection Dialog for Unauthenticated Users or No Preferred Address */}
      {!user?.preferred_shipping_address && mounted && (
        <LocationSelection
          isOpen={isLocationSelectionOpen}
          onClose={handleCloseLocationSelection}
        />
      )}
    </div>
  );
};

export default DeliverSelection;
