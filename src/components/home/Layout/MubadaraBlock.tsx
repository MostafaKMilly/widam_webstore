import React from "react";
import Image from "next/image";

interface MubadaraBlockProps {
  block: {
    background: string;
    title: string;
    show_title: number;
    show_title_block: number;
    icon: string | null;
    data: Array<{
      website_item_id: string;
      website_item_name: string;
      website_item_short_name: string | null;
      website_item_image: string;
      price: {
        website_item_price: number;
        discount_title: string | null;
        discount_percent: number;
        discount_amount: number;
        discounted_price: number;
        currency: string;
      };
      tags: string[];
      in_stock: number;
      is_requires_preparation: string;
      stock_uom: string;
      price_modifier_title: string | null;
      is_price_modifier: number;
    }>;
  };
}

const MubadaraBlock: React.FC<MubadaraBlockProps> = ({ block }) => {
  return (
    <div
      className="my-4 p-4 rounded-lg"
      style={{ backgroundColor: block.background || "#fff" }}
    >
      {block.show_title === 1 && (
        <div className="flex items-center mb-4">
          {block.icon && (
            <Image
              src={block.icon}
              alt="Icon"
              width={32}
              height={32}
              className="mr-2"
            />
          )}
          <h2 className="text-xl font-semibold">{block.title}</h2>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {block.data.map((item) => (
          <div
            key={item.website_item_id}
            className="flex flex-col border rounded-lg shadow-sm p-4"
            style={{
              border: "0.5px solid #DBDBDB",
              backgroundColor: "#FFF",
              boxShadow: "0px 0px 1.5px 0px rgba(0, 0, 0, 0.16)",
            }}
          >
            {item.price.discount_percent > 0 && (
              <div className="self-start px-2 py-1 bg-red-500 text-white text-sm font-bold rounded-md mb-2">
                {item.price.discount_percent}% OFF
              </div>
            )}
            <Image
              src={item.website_item_image}
              alt={item.website_item_name}
              width={300}
              height={200}
              className="w-full h-32 object-cover rounded mb-2"
            />
            <h3 className="text-lg font-medium mb-1">
              {item.website_item_name}
            </h3>
            {item.website_item_short_name && (
              <p className="text-sm text-gray-500 mb-1">
                {item.website_item_short_name}
              </p>
            )}
            <div className="flex items-center justify-between mt-2">
              <div className="text-2xl font-semibold text-gray-800">
                {item.price.discounted_price.toFixed(2)} {item.price.currency}
              </div>
              {item.price.discount_amount > 0 && (
                <div className="text-sm text-gray-400 line-through">
                  {item.price.website_item_price.toFixed(2)}{" "}
                  {item.price.currency}
                </div>
              )}
            </div>
           
            {item.tags.length > 0 && (
              <div className="flex gap-1 mt-2">
                {item.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            {item.is_price_modifier === 1 && item.price_modifier_title && (
              <p className="text-sm text-red-500 mt-2">
                Additional: {item.price_modifier_title}
              </p>
            )}
            <div className="mt-4 flex items-center justify-center">
              <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded">
                {item.in_stock > 0 ? "Add to Cart" : "Out of Stock"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MubadaraBlock;
