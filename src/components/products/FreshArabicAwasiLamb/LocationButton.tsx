import React from "react";

interface LocationButtonProps {
  name: string;
  isActive: boolean;
  onClick: () => void;
}

const LocationButton: React.FC<LocationButtonProps> = ({
  name,
  isActive,
  onClick,
}) => {
  const baseClasses =
    "px-16 py-4 rounded border border-solid shadow-sm max-md:px-5";
  const activeClasses = "font-semibold text-sky-800 bg-white border-sky-800";
  const inactiveClasses =
    "text-black border-zinc-400 shadow-[0px_3px_5px_rgba(0,0,0,0.051)]";

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
    >
      {name}
    </button>
  );
};

export default LocationButton;
