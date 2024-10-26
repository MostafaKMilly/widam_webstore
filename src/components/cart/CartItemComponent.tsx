"use client";

import React from "react";
import Image from "next/image";
import { PlusIcon, MinusIcon, TrashIcon, Minus, Plus } from "lucide-react";
import useCartStore from "@/lib/store/cartStore";
import { WebsiteItem } from "@/lib/queries/getWebsiteItem";

interface CartItemProps {
  item: WebsiteItem;
}

const CartItemComponent: React.FC<CartItemProps> = ({ item }) => {
  const addItem = useCartStore((state) => state.addItem);
  const decrementItem = useCartStore((state) => state.decrementItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const setItemQuantity = useCartStore((state) => state.setItemQuantity);

  const handleIncrement = async () => {
    await addItem(item, 1);
  };

  const handleDecrement = async () => {
    if ((item.qty_in_cart || 0) > 1) {
      await decrementItem(item.website_item_id);
    } else {
      await removeItem(item.website_item_id);
    }
  };

  const handleQuantityChange = async (quantity: number) => {
    await setItemQuantity(item.website_item_id, quantity);
  };

  const hasDiscount =
    item.price.discounted_price > 0 &&
    item.price.discounted_price < item.price.website_item_price;

  const discountPercentage = hasDiscount
    ? (
        ((item.price.website_item_price - item.price.discounted_price) /
          item.price.website_item_price) *
        100
      ).toFixed(0)
    : null;

  const isOutOfStock = item.in_stock === 0;

  return (
    <div className="flex bg-white rounded-md  p-4  items-center relative">
      <div className="relative w-24 h-24 bg-gray-100 rounded-md overflow-hidden">
        {item.website_item_image ? (
          <Image
            src={item.website_item_image}
            alt={item.website_item_name}
            layout="fill"
            objectFit="contain"
            className="object-contain"
          />
        ) : (
          <div className="w-full h-full bg-gray-200"></div>
        )}
        {hasDiscount && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-sm font-semibold px-2 py-1 rounded-md">
            {discountPercentage}% OFF
          </div>
        )}
        <div className="absolute top-1 right-1 flex flex-col flex-wrap ">
          {item.tags &&
            item.tags.map((tag) => (
              <div
                key={tag.id}
                className="flex items-center gap-1 bg-gray-200 text-sm px-1 py-1 rounded-md"
              >
                {tag.icon && (
                  <Image
                    src={tag.icon}
                    alt={tag.title}
                    width={16}
                    height={16}
                  />
                )}
                {tag.product_label === 1 && (
                  <span className="text-gray-700">{tag.title}</span>
                )}
              </div>
            ))}
        </div>
      </div>
      <div className="flex-grow ml-4">
        <h3 className="text-lg font-medium text-neutral-800">
          {item.website_item_name}
        </h3>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-2xl font-bold">
            {hasDiscount
              ? item.price.discounted_price.toFixed(2)
              : item.price.website_item_price?.toFixed(2)}
          </span>
          <span>QAR</span>
          {hasDiscount && (
            <span className="text-lg line-through text-gray-400">
              {item.price.website_item_price?.toFixed(2)} QAR
            </span>
          )}
        </div>
        {/* Display stock_uom */}
        <p className="text-sm text-[#888]">{item.stock_uom}</p>
        {item.is_express_item === 1 && (
          <Image
            src="/icons/express.svg"
            width={118.864}
            height={29.204}
            alt="expressItem"
          />
        )}
      </div>
      <div className="flex items-center justify-between w-[170px] min-w-[180px] mt-4 bg-[#f6f6f6] rounded-[48px]">
        <button
          onClick={handleDecrement}
          className="w-[48px] h-[48px] border bg-[#f6f6f6] border-[#EB5757] text-[#EB5757] flex justify-center items-center rounded-full"
        >
          {(item.qty_in_cart || 0) > 1 ? (
            <Minus className="w-6 h-6 text-[#EB5757]" />
          ) : (
            <TrashIcon className="w-6 h-6 text-[#EB5757]" />
          )}
        </button>
        <span className="text-xl font-semibold">{item.qty_in_cart}</span>
        <button
          onClick={handleIncrement}
          className="w-[48px] h-[48px] bg-[#EB5757] flex justify-center items-center rounded-full"
        >
          <Plus className="text-white w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default CartItemComponent;
