import Link from "next/link";
import Image from "next/image";
import React from "react";

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

  const gridClasses = isHorizontalScroll
    ? "flex overflow-x-auto space-x-4"
    : "flex flex-wrap justify-start gap-6";

  const itemContainerClasses = isCircle
    ? "w-24 h-24 rounded-full"
    : isSquare
    ? ""
    : "rounded";

  const containerClasses =
    block.background !== "#fff" && block.background !== "#ffffff"
      ? "w-screen -mx-4 px-4 sm:-mx-6 sm:px-6 md:-mx-8 md:px-8 lg:-mx-12 lg:px-12 2xl:px-2 2xl:mx-0 2xl:w-full"
      : "my-4  rounded";

  return (
    <div
      className={`relative py-4 px-2 ${containerClasses}`}
      style={{
        backgroundColor: block.background || "#fff",
        borderColor: block.item_group_background || "#f0f0f0",
      }}
    >
      {block.show_title === 1 && (
        <h2 className="text-xl font-semibold mb-6 flex items-center">
          {block.title}
        </h2>
      )}
      <div className={gridClasses}>
        {block.data.map((item) => (
          <Link
            key={item.item_group_id}
            href={`/categories/${item.item_group_id}?${item.parameters || ""}`}
            className={`flex flex-col items-center gap-1 justify-center ${itemContainerClasses}`}
            style={{
              ...(isCircle ? { borderRadius: "50%" } : {}),
            }}
          >
            <div
              className={`relative w-full h-full ${
                isCircle ? "rounded-full" : ""
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
                    ? "object-cover rounded-full h-full"
                    : "object-cover max-w-44"
                }`}
              />
            </div>
            {!isCircle &&
              block.show_title_block === 1 &&
              item.item_group_id !== "All Item Groups" && (
                <h3 className="text-center text-sm font-medium mt-2">
                  {item.item_group_name}
                </h3>
              )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ItemGroupBlock;
