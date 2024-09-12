/**
 * This code was generated by Builder.io.
 */
import React from "react";

const QuantitySelector: React.FC = () => {
  return (
    <div className="flex gap-8 items-start px-7 max-md:justify-evenly py-4 text-xl font-semibold text-sky-800 whitespace-nowrap bg-white rounded-sm border-sky-700 border-solid shadow-sm border-[0.5px] max-md:px-5">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/dd18f79675a296947543ae7b694d600893916d5483b9ee9f5fd18c0b3082ae37?placeholderIfAbsent=true&apiKey=9810db3822b54ab583e896edd833d595"
        alt="Decrease quantity"
        className="object-contain shrink-0 self-stretch my-auto w-[11px]"
      />
      <div className="shrink-0 w-px h-6 border border-solid border-neutral-300" />
      <div>3</div>
      <div className="shrink-0 w-px h-6 border border-solid border-neutral-300" />
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/be4aa5466702e63455d6327670eab1e1b73d3b5e59b7cbc9bfe44b10a525f8cd?placeholderIfAbsent=true&apiKey=9810db3822b54ab583e896edd833d595"
        alt="Increase quantity"
        className="object-contain shrink-0 self-stretch my-auto w-3 aspect-square"
      />
    </div>
  );
};

export default QuantitySelector;