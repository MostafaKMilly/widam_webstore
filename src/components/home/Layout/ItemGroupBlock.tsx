"use client";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { LayoutGrid } from "lucide-react";
import { useDictionary } from "@/lib/hooks/useDictionary";

interface ItemGroupBlockProps {
  block: {
    background: string;
    show_title: number;
    title: string;
    view_type: string;
    show_title_block: number;
    icon: string | null;
    item_group_background: string;
    data: Array<{
      item_group_id: string;
      item_group_name: string;
      item_group_image: string;
      parameters: string | null;
    }>;
  };
}

const ItemGroupBlock: React.FC<ItemGroupBlockProps> = ({ block }) => {
  const isHorizontalScroll = block.view_type === "Horizontal Scroll";
  const isCircle = block.view_type === "Circle";
  const isSquare = block.view_type === "Square";
  const { dictionary } = useDictionary();
  const translatedTitle =
    block.title === "Meat Court" ? dictionary.meat_court : block.title;
  const gridClasses = isHorizontalScroll
    ? "flex overflow-x-auto gap-6"
    : "flex flex-wrap justify-start gap-6";

  const itemContainerClasses = isCircle
    ? "rounded-full"
    : isSquare
    ? ""
    : "rounded";

  const maxItems =
    block.title === "Categories"
      ? 7
      : block.title === "Meat Court"
      ? 9
      : block.data.length;

  return (
    <div
      className={`relative py-4 px-8`}
      style={{
        backgroundColor: block.background || "#fff",
        borderColor: block.item_group_background || "#f0f0f0",
      }}
    >
      {block.show_title === 1 && (
        <h2 className="text-xl font-semibold mb-6 flex items-center">
          {translatedTitle}
        </h2>
      )}
      <div className={gridClasses}>
        {block.data.slice(0, maxItems).map((item) => (
          <Link
            key={item.item_group_id}
            href={`/categories?category=${item.item_group_id}?${
              item.parameters || ""
            }`}
            className={`flex flex-col items-center gap-1 justify-center ${itemContainerClasses}`}
            style={{
              ...(isCircle ? { borderRadius: "50%" } : {}),
            }}
          >
            <div
              className={`relative w-full h-full ${
                isCircle ? "rounded-full w-24 h-24" : ""
              }`}
              style={{
                backgroundColor: block.item_group_background,
              }}
            >
              <Image
                src={item.item_group_image}
                alt={item.item_group_name}
                width={128}
                height={128}
                className={`${
                  isCircle
                    ? "object-contain rounded-full h-full"
                    : "object-cover max-w-44 w-[128px]"
                }`}
              />
            </div>
            {block.show_title_block === 1 &&
              item.item_group_id !== "All Item Groups" && (
                <h3 className="text-center text-sm font-medium mt-2 max-w-[128px] truncate">
                  {item.item_group_name}
                </h3>
              )}
          </Link>
        ))}
        {block.title === "Categories" && (
          <Link
            href="/categories"
            className={`flex flex-col items-center gap-1 justify-center ${itemContainerClasses}`}
            style={{
              ...(isCircle ? { borderRadius: "50%" } : {}),
            }}
          >
            <div
              className={`relative w-full h-full ${
                isCircle ? "rounded-full w-24 h-24" : ""
              }`}
              style={{
                backgroundColor: block.item_group_background,
              }}
            >
              <div
                className={`flex items-center justify-center h-full bg-gray-200 w-[128px] ${
                  isCircle ? "rounded-full" : ""
                }`}
              >
                <LayoutGrid className="text-[#292D32] w-16 h-16" />
              </div>
            </div>
            {block.show_title_block === 1 && (
              <h3 className="text-center text-sm font-medium mt-2 max-w-[128px] truncate">
                View All
              </h3>
            )}
          </Link>
        )}
      </div>
    </div>
  );
};

export default ItemGroupBlock;
