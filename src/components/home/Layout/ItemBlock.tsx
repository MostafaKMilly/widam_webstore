// /components/ItemBlock.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { PlusIcon, Settings2, TrashIcon } from "lucide-react";
import Link from "next/link";
import useCartStore from "@/lib/store/cartStore";
import { motion, AnimatePresence } from "framer-motion";
import AddNumberDialog from "@/components/RegisterDialogs/AddNumberDialog";
import useUserStore from "@/lib/store/userStore";
import { useDictionary } from "@/lib/hooks/useDictionary";
import toast from "react-hot-toast";

interface ItemBlockProps {
  block: {
    block_id: string;
    block_type: string;
    title: string;
    show_title: number;
    show_title_block: number;
    background: string;
    icon: string | null;
    is_dynamic: number;
    filling_to_show: string;
    data: Array<{
      is_express_item: number;
      website_item_id: string;
      website_item_name: string;
      website_item_short_name: string | null;
      website_item_image: string;
      website_item_type: string;
      stock_uom: string;
      has_website_variant: number;
      min_qty: number;
      max_qty: number;
      price: {
        website_item_price: number;
        discount_title: string | null;
        discount_percent: number;
        discount_amount: number;
        discounted_price: number;
        currency: string;
      };
      has_product_options: number;
      tags: Array<{
        id: string;
        title: string;
        icon: string;
        color: string | null;
        product_label: number;
      }>;
      in_stock: number;
    }>;
  };
}

const ItemBlock: React.FC<ItemBlockProps> = ({ block }) => {
  const [counter, setCounter] = useState<{ [key: string]: number }>({});
  const addItem = useCartStore((state) => state.addItem);
  const decrementItem = useCartStore((state) => state.decrementItem);
  const user = useUserStore((state) => state.user);
  const { dictionary } = useDictionary();
  const translatedTitle =
    block.title.replace("STATIC", "") === "Recommended For you "
      ? dictionary.recommended_for_you
      : block.title.replace("STATIC", "");

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleIncrement = async (item: any) => {
    setCounter((prev) => ({
      ...prev,
      [item.website_item_id]: (prev[item.website_item_id] || 0) + 1,
    }));

    if (!user) {
      setIsDialogOpen(true);
      return;
    }

    try {
      await addItem(item, 1);
    } catch (error) {
      console.error("Error adding item to cart:", error);
      toast.error("Failed to add item to cart.");
    }
  };

  const handleDecrement = async (item: any) => {
    setCounter((prev) => ({
      ...prev,
      [item.website_item_id]: Math.max(
        (prev[item.website_item_id] || 0) - 1,
        0
      ),
    }));

    if (!user) {
      setIsDialogOpen(true);
      return;
    }

    try {
      await decrementItem(item.website_item_id);
    } catch (error) {
      console.error("Error decrementing item:", error);
      toast.error("Failed to update cart.");
    }
  };

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  return (
    <div
      className="p-4 px-8 rounded shadow-sm"
      style={{ backgroundColor: block.background || "#fff" }}
    >
      {block.show_title === 1 && (
        <h2 className="text-[#004990] md:text-3xl text-lg font-semibold mb-6 flex items-center">
          {translatedTitle}
        </h2>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {block.data.map((item) => {
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

          const isSelected =
            user?.preferred_shipping_address &&
            user.preferred_shipping_address.address_id === item.website_item_id;

          const itemContent = (
            <div className="flex flex-col bg-white rounded-md shadow-sm p-4 border border-[#d1d5db] transition-all relative h-full">
              <div className="flex flex-col pb-8 flex-grow">
                <div
                  className={`relative w-full aspect-square bg-gray-100 h-[280px] rounded-md overflow-hidden ${
                    isOutOfStock ? "opacity-50" : "opacity-100"
                  }`}
                >
                  <Image
                    src={item.website_item_image}
                    alt={item.website_item_name}
                    layout="fill"
                    objectFit="contain"
                    className="object-contain"
                  />
                  {hasDiscount && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-sm font-semibold px-2 py-1 rounded-md">
                      {discountPercentage}% OFF
                    </div>
                  )}

                  <div className="absolute top-1 right-1 flex flex-col flex-wrap ">
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
                <h3 className="text-lg font-medium text-neutral-800 mt-4 mb-2">
                  {item.website_item_name || item.website_item_short_name}
                </h3>
                <div className="flex flex-col items-start gap-1">
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
                {!item.in_stock && (
                  <p className="text-red-500 text-sm mt-2">Out of Stock</p>
                )}
              </div>

              {/* Add Buttons for Non-Variant Items */}
              {item.website_item_type !== "V" && (
                <AnimatePresence>
                  {counter[item.website_item_id] > 0 ? (
                    <motion.div
                      key="counter"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="flex items-center justify-between w-[170px] min-w-[180px] mt-1 bg-[#f6f6f6] rounded-[48px] absolute bottom-3 ltr:right-3 rtl:left-3"
                      style={{
                        visibility: isOutOfStock ? "hidden" : "visible",
                      }}
                    >
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleDecrement(item);
                        }}
                        className={`w-[48px] h-[48px] border bg-[#f6f6f6] border-[#EB5757] text-[#EB5757] flex justify-center items-center rounded-full`}
                        disabled={isOutOfStock}
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
                        disabled={isOutOfStock}
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
                      className="ml-auto mt-1 w-[48px] h-[48px] bg-[#03ADEB] flex justify-center items-center rounded-full absolute bottom-3 ltr:right-3 rtl:left-3"
                      style={{
                        visibility: isOutOfStock ? "hidden" : "visible",
                      }}
                      disabled={isOutOfStock}
                    >
                      <PlusIcon className="text-white w-8 h-8 my-auto mx-auto" />
                    </motion.button>
                  )}
                </AnimatePresence>
              )}

              {/* Add Button for Variant Items */}
              {item.website_item_type === "V" && (
                <button
                  className="ml-auto mt-1 w-[48px] h-[48px] bg-[#03ADEB] flex justify-center items-center rounded-full absolute bottom-3 ltr:right-3 rtl:left-3"
                  onClick={(e) => {
                    if (!user) {
                      e.stopPropagation();
                      setIsDialogOpen(true);
                    }
                  }}
                  style={{
                    visibility: isOutOfStock ? "hidden" : "visible",
                  }}
                  disabled={isOutOfStock}
                >
                  <Settings2 className="text-white w-6 h-6" />
                </button>
              )}
            </div>
          );

          return isOutOfStock ? (
            <div
              key={item.website_item_id}
              className={`cursor-not-allowed opacity-50 flex flex-col`}
            >
              {itemContent}
            </div>
          ) : (
            <Link
              href={`/products/${item.website_item_id}`}
              key={item.website_item_id}
              className="flex flex-col h-full"
            >
              {itemContent}
            </Link>
          );
        })}
      </div>

      <AddNumberDialog isOpen={isDialogOpen} onClose={closeDialog} />
    </div>
  );
};

export default ItemBlock;
