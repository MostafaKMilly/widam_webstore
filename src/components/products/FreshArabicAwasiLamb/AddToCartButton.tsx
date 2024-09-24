import React from "react";

interface AddToCartButtonProps {
  price: number;
  onClick: () => void;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  price,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-auto gap-3.5 px-14 py-4 font-bold bg-primary text-white rounded max-md:px-5 max-w-[378px] max-md:max-w-full  transition-colors"
    >
      <div className="grow text-2xl capitalize">Add To Cart</div>
      <div className="my-auto text-lg">QAR {price.toFixed(2)}</div>
    </button>
  );
};

export default AddToCartButton;
