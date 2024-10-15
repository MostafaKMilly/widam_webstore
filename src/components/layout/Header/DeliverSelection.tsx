"use client";
import LocationSelection from "@/components/LocationSelection/LocationSelection";
import { getUser } from "@/lib/api/profile";
import { useDictionary } from "@/lib/hooks/useDictionary";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

const DeliverSelection: React.FC = () => {
  const [isLocationSelectionOpen, setIsLocationSelectionOpen] = useState(false);
  const { dictionary } = useDictionary();
  const { data: user, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getUser(),
  });

  const handleOpenLocationSelection = () => {
    setIsLocationSelectionOpen(true);
  };

  const handleCloseLocationSelection = () => {
    setIsLocationSelectionOpen(false);
  };

  useEffect(() => {
    const hasOpened = localStorage.getItem("hasOpenedDialog");
    if (!hasOpened) {
      setIsLocationSelectionOpen(true);
    }
  }, []);

  return (
    <div>
      <div
        className="flex items-center gap-2.5 cursor-pointer"
        onClick={handleOpenLocationSelection}
      >
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/549e2d02a24238a076781bc3e6b93c72c473806eae1a3aef02a356e8589eb3ab?apiKey=9810db3822b54ab583e896edd833d595&&apiKey=9810db3822b54ab583e896edd833d595"
          alt=""
          className="object-contain shrink-0 self-start aspect-[0.86] w-[30px]"
        />
        <div>
          <span className="text-white font-normal">
            {dictionary.deliver_to}
          </span>
          <br />
          Al Sadd, Qatar
        </div>
      </div>
      <LocationSelection
        isOpen={isLocationSelectionOpen}
        onClose={handleCloseLocationSelection}
      />
    </div>
  );
};

export default DeliverSelection;
