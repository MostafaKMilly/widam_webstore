"use client";
import React, { useState } from "react";
import LocationInput from "./LocationInput";
import ActionButtons from "./ActionButtons";
import { GoogleMapsEmbed } from "@next/third-parties/google";

const LocationSelection: React.FC = () => {
  const [location, setLocation] = useState("");

  const handleLocationChange = (newLocation: string) => {
    setLocation(newLocation);
  };

  return (
    <main className="flex flex-col rounded-none">
      <section className="flex flex-col pt-5 w-full bg-white rounded-xl max-md:max-w-full">
        <h1 className="self-center text-3xl font-bold text-zinc-950">
          Choose your location
        </h1>
        <div className="flex relative z-10 flex-col px-6 py-6 mt-4 w-full rounded-none min-h-[738px] max-md:pl-5 max-md:max-w-full">
        {/*   <GoogleMapsEmbed
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string}
            height={400}
            width="100%"
            mode="view"
            style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;"
            center="37.4218,-122.0840"
          /> */}
          <LocationInput
            location={location}
            onLocationChange={handleLocationChange}
          />
          <ActionButtons />
        </div>
      </section>
    </main>
  );
};

export default LocationSelection;
