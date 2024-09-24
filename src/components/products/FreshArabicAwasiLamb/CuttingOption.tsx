import React from "react";

interface CuttingOptionProps {
  image: string;
  label: string;
  isSelected: boolean;
  onSelect: () => void;
}

const CuttingOption: React.FC<CuttingOptionProps> = ({
  image,
  label,
  isSelected,
  onSelect,
}) => {
  return (
    <button
      onClick={onSelect}
      className={`flex flex-col items-center justify-center px-4 py-3 rounded border ${
        isSelected
          ? "border-sky-500 bg-sky-100"
          : "border-zinc-400 bg-white hover:bg-gray-100"
      } min-w-[130px] max-w-[130px]`}
    >
      <img
        loading="lazy"
        src={image}
        alt={`${label} cutting option`}
        className="object-contain w-16 h-16 mb-2"
      />
      <div className="text-center text-sm font-medium">{label}</div>
    </button>
  );
};

export default CuttingOption;
