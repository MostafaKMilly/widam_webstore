// components/UserActions.tsx
"use client";
import React, { useEffect, useState } from "react";
import { ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import useCartStore from "@/lib/store/cartStore";

const UserActions: React.FC = () => {
  const cartItemCount = useCartStore((state) => state.getTotalCount());
  const totalPrice = useCartStore((state) => state.getTotalPrice()); // Get total price
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  // Format the total price to QAR currency
  const formattedTotalPrice = new Intl.NumberFormat("en-QA", {
    style: "currency",
    currency: "QAR",
    minimumFractionDigits: 2,
  }).format(totalPrice);

  return (
    <div className="flex gap-2.5 items-center mt-1.5 ml-1 text-sm font-semibold text-white">
      <div className="my-auto flex">
        {loaded && <p className="ml-auto">{formattedTotalPrice}</p>}
        {/* Display total price */}
      </div>

      <div className="relative">
        <Link
          href="/cart"
          className="flex items-center justify-center bg-white rounded-full h-[41px] w-[41px]"
        >
          <ShoppingCart className="text-[#03ADEB]" size={24} />
        </Link>
        {cartItemCount > 0 && loaded && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center h-4 w-4 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
            {cartItemCount}
          </span>
        )}
      </div>

      <Link
        href="/settings"
        className="flex items-center justify-center bg-white rounded-full h-[38px] w-[38px]"
      >
        <User className="text-[#03ADEB]" size={24} />
      </Link>
    </div>
  );
};

export default UserActions;
