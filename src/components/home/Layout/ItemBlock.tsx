import React from "react";
import Image from "next/image";
import Link from "next/link";

interface ItemBlockProps {
  block: {
    title: string;
    show_title: number;
    show_title_block: number;
    background: string;
    icon: string | null;
    data: Array<{
      website_item_id: string;
      website_item_name: string;
      website_item_short_name: string;
      website_item_image: string;
      price: {
        website_item_price: number;
        discounted_price: number;
        currency: string;
      };
      in_stock: number;
      stock_uom: string;
      tags: Array<{
        id: string;
        title: string;
        icon: string;
        color: string | null;
        product_label: number;
      }>;
    }>;
  };
}

const ItemBlock: React.FC<ItemBlockProps> = ({ block }) => {
  return (
    <div
      className="my-8 p-4 rounded shadow-sm"
      style={{ backgroundColor: block.background || "#fff" }}
    >
      {block.show_title === 1 && (
        <h2 className="text-xl font-semibold mb-6 flex items-center">
          {block.title.replace("STATIC", "")}
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

          return (
            <Link
              key={item.website_item_id}
              href={`/product/${item.website_item_id}`}
              className="flex flex-col bg-white rounded-md shadow-sm p-4 border border-[#d1d5db] transition-all hover:shadow-lg relative"
            >
              <div className="flex flex-col">
                <div className="relative w-full aspect-square bg-gray-100 rounded-md overflow-hidden">
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
                <h3 className="text-lg font-medium text-neutral-800 mt-4 mb-2">
                  {item.website_item_short_name}
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
                </div>
                {!item.in_stock && (
                  <p className="text-red-500 text-sm mt-2">Out of Stock</p>
                )}
                <div className="ml-auto mt-1">
                  <Image
                    src="/icons/Group 4585.svg"
                    alt="Action Button"
                    width={40}
                    height={40}
                    className="cursor-pointer"
                  />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ItemBlock;
