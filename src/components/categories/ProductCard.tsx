"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { PlusIcon, Settings2, TrashIcon } from "lucide-react";
import { WebsiteItem } from "@/lib/queries/getItemGroups";

interface ProductCardProps {
  item: WebsiteItem;
}

const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
  const [counter, setCounter] = useState<{ [key: string]: number }>({});

  const hasDiscount = item.price.discount_percent > 0;
  const discountPercentage = item.price.discount_percent;

  const handleIncrement = (item: WebsiteItem) => {
    setCounter((prevCounter) => ({
      ...prevCounter,
      [item.website_item_id]: (prevCounter[item.website_item_id] || 0) + 1,
    }));
  };

  const handleDecrement = (item: WebsiteItem) => {
    setCounter((prevCounter) => {
      const newCount = (prevCounter[item.website_item_id] || 0) - 1;
      if (newCount <= 0) {
        const { [item.website_item_id]: _, ...rest } = prevCounter;
        return rest;
      } else {
        return {
          ...prevCounter,
          [item.website_item_id]: newCount,
        };
      }
    });
  };

  return (
    <Link
      href={`/products/${item.website_item_id}`}
      key={item.website_item_id}
      className={`flex flex-col bg-white rounded-md shadow-sm p-4 border border-[#d1d5db] w-full transition-all hover:shadow-lg relative h-full`}
    >
      <div className="flex flex-col h-full">
        {/* Image Section */}
        <div className="relative w-full aspect-square bg-gray-100 rounded-md overflow-hidden">
          <Image
            src={item.website_item_image}
            alt={item.website_item_name}
            fill
            style={{ objectFit: "contain" }}
          />
          {hasDiscount && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-sm font-semibold px-2 py-1 rounded-md">
              {discountPercentage}% OFF
            </div>
          )}

          <div className="absolute top-1 right-1 flex flex-wrap ">
            {item.tags.map((tag) => (
              <div
                key={tag.id}
                className="flex items-center gap-1 bg-gray-200 text-sm px-1 py-1 rounded-md"
              >
                {tag.icon && (
                  <Image
                    src={tag.icon}
                    alt={tag.title}
                    width={32}
                    height={32}
                  />
                )}
                {tag.product_label === 1 && (
                  <span className="text-gray-700">{tag.title}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col flex-1 mt-4">
          <h3 className="text-lg font-medium text-neutral-800 mb-2 line-clamp-2">
            {item.website_item_name || item.website_item_short_name}
          </h3>
          <div className="flex flex-col items-start gap-1 mt-auto">
            <span className="text-xl font-semibold text-gray-800">
              {hasDiscount
                ? `${item.price.discounted_price} ${item.price.currency}`
                : `${item.price.website_item_price} ${item.price.currency}`}
            </span>
            {hasDiscount && (
              <span className="text-lg line-through text-gray-400">
                {item.price.website_item_price} {item.price.currency}
              </span>
            )}
            {/* Display stock_uom under the price */}
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
        </div>

        {/* Out of Stock Message */}
        {!item.in_stock && (
          <p className="text-red-500 text-sm mt-2">Out of Stock</p>
        )}

        {/* Action Buttons */}
        {item.website_item_type !== "V" && (
          <AnimatePresence>
            {counter[item.website_item_id] > 0 ? (
              <motion.div
                key="counter"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex items-center justify-between w-[160px] min-w-[160px] mt-1 space-x-6 bg-[#f6f6f6] rounded-[48px] absolute bottom-3 right-3"
              >
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleDecrement(item);
                  }}
                  className={`w-[48px] h-[48px] border bg-[#f6f6f6] border-[#EB5757] text-[#EB5757] flex justify-center items-center rounded-full`}
                >
                  <TrashIcon className="w-6 h-6 text-[#EB5757]" />
                </button>
                <span className="text-xl font-semibold">
                  {counter[item.website_item_id]}
                </span>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleIncrement(item);
                  }}
                  className="w-[48px] h-[48px] bg-[#EB5757] flex justify-center items-center rounded-full"
                >
                  <PlusIcon className="text-white w-6 h-6" />
                </button>
              </motion.div>
            ) : (
              <motion.button
                key="plusButton"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={(e) => {
                  e.preventDefault();
                  handleIncrement(item);
                }}
                className="ml-auto mt-1 w-[48px] h-[48px] bg-[#03ADEB] flex justify-center items-center rounded-full absolute bottom-3 right-3"
              >
                <PlusIcon className="text-white w-8 h-8 my-auto mx-auto" />
              </motion.button>
            )}
          </AnimatePresence>
        )}
        {item.website_item_type === "V" && (
          <button className="ml-auto mt-1 w-[48px] h-[48px] bg-[#03ADEB] flex justify-center items-center rounded-full absolute bottom-3 right-3">
            <Settings2 className="text-white w-6 h-6" />
          </button>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
