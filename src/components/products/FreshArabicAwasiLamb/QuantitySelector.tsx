import React from "react";

interface QuantitySelectorProps {
  quantity: number;
  min: number;
  max: number;
  onChange: (newQuantity: number) => void;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  min,
  max,
  onChange,
}) => {
  const handleDecrease = () => {
    if (quantity > min) {
      onChange(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < max) {
      onChange(quantity + 1);
    }
  };

  return (
    <div className="flex gap-4 items-center px-4 max-md:justify-evenly py-2 text-xl font-semibold text-sky-800 whitespace-nowrap bg-white rounded-sm border-sky-700 border-solid shadow-sm border-[0.5px] max-md:px-5">
      {/* Decrease Button */}
      <button
        onClick={handleDecrease}
        disabled={quantity <= min}
        className={`flex items-center justify-center w-10 h-10 bg-transparent text-sky-800 rounded-md ${
          quantity <= min ? "opacity-50 cursor-not-allowed" : ""
        }`}
        aria-label="Decrease quantity"
      >
        −
      </button>

      {/* Divider */}
      <div className="shrink-0 w-px h-6 border border-solid border-neutral-300" />

      {/* Quantity Display */}
      <div className="w-10 text-center">{quantity}</div>

      {/* Divider */}
      <div className="shrink-0 w-px h-6 border border-solid border-neutral-300" />

      {/* Increase Button */}
      <button
        onClick={handleIncrease}
        disabled={quantity >= max}
        className={`flex items-center justify-center w-10 h-10 bg-transparent text-sky-800 rounded-md ${
          quantity >= max ? "opacity-50 cursor-not-allowed" : ""
        }`}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
};

export default QuantitySelector;
