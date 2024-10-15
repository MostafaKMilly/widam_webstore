// /components/cart/CartItem.tsx
"use client";

import React from "react";
import Image from "next/image";
import { PlusIcon, MinusIcon, TrashIcon } from "lucide-react"; // Updated Lucide Icons
import useCartStore from "@/lib/store/cartStore";
import { motion, AnimatePresence } from "framer-motion";
import { useDictionary } from "@/lib/hooks/useDictionary";

interface CartItemProps {
  item: {
    id: string;
    name: string;
    quantity: number;
    price: number;
    image: string;
  };
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { dictionary } = useDictionary(); // Localization
  const addItem = useCartStore((state) => state.addItem);
  const decrementItem = useCartStore((state) => state.decrementItem);
  const removeItem = useCartStore((state) => state.removeItem);

  const handleIncrement = () => {
    addItem({ ...item, quantity: 1 });
  };

  const handleDecrement = () => {
    if (item.quantity === 1) {
      removeItem(item.id);
    } else {
      decrementItem(item.id);
    }
  };

  return (
    <div className="flex items-center p-4 hover:bg-gray-50 transition-colors rounded-lg shadow-sm">
      {/* Product Image */}
      <div className="w-24 h-24 relative flex-shrink-0">
        <Image
          src={item.image}
          alt={item.name}
          layout="fill"
          objectFit="cover"
          className="rounded-md"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 ml-6">
        <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
        <p className="text-gray-600 mt-1">
          {dictionary.price || "Price"}: QAR {item.price.toFixed(2)}
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center gap-x-3 bg-[#F6F6F6] rounded-s-full rounded-e-full">
          {/* Decrement Button */}
          <button
            onClick={handleDecrement}
            className="flex items-center justify-center w-10 h-10 border border-red-500 text-red-500 rounded-full hover:border-red-600 transition-colors"
            aria-label={dictionary.decrement || "Decrease quantity"}
          >
            <MinusIcon className="w-5 h-5" />
          </button>

          {/* Quantity Display */}
          <span className="mx-2 text-lg font-medium text-gray-800">
            {item.quantity}
          </span>

          {/* Increment Button */}
          <button
            onClick={handleIncrement}
            className="flex items-center justify-center w-10 h-10 bg-[#04ADEB] text-white rounded-full transition-colors"
            aria-label={dictionary.increment || "Increase quantity"}
          >
            <PlusIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Remove Button */}
        <button
          onClick={() => removeItem(item.id)}
          className="p-2  text-gray-500 rounded-full  transition-colors"
          aria-label={dictionary.remove || "Remove item"}
        >
          <TrashIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
``;
