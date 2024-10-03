// DefaultAddress.tsx
import React from "react";
import { Address } from "@/lib/api/addresses";

interface DefaultAddressProps {
  address: Address;
}

const DefaultAddress: React.FC<DefaultAddressProps> = ({ address }) => {
  const { latitude, longitude } = address || {};

  return (
    <div
      className="px-3.5 py-4 mt-3.5 rounded-sm border border-solid border-zinc-100 shadow-sm max-md:pr-5 max-md:max-w-full"
      style={{
        border: "1px solid #ECECEC",
        boxShadow: "2px 2px 2.5px 0px rgba(0, 0, 0, 0.16)",
      }}
    >
      <div className="flex gap-5 max-md:flex-col">
        <div className="flex flex-col max-md:ml-0 max-md:w-full">
          {latitude && longitude ? (
            <iframe
              title="Address Location"
              src={`https://www.google.com/maps/embed/v1/view?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}&center=${latitude},${longitude}&zoom=15`}
              className="object-contain shrink-0 rounded aspect-square w-[90px] max-md:mt-8"
              allowFullScreen
              loading="lazy"
            ></iframe>
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
              {address.building_no}, {address.street_no}, {address.city},{" "}
              {address.zone}, {address.country}
            </div>
            <div className="self-start mt-1.5 text-sky-800">
              {address.phone}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefaultAddress;
