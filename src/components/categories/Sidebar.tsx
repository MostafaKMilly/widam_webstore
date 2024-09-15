"use client";
import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { LayoutGrid } from "lucide-react";

const categories = [
  {
    item_group_id: "IG001",
    item_group_name: "Beef",
    item_group_image: "https://widam.akwad.qa/files/Cow604f7e.png",
    is_group: 1,
  },

  {
    item_group_id: "IG011",
    item_group_name: "Chicken",
    item_group_image: "https://widam.akwad.qa/files/chicken 33.png",
    is_group: 1,
  },
  {
    item_group_id: "IG015",
    item_group_name: "Dairy",
    item_group_image: "https://widam.akwad.qa/files/OK_Dairy.png",
    is_group: 1,
  },
  {
    item_group_id: "IG016",
    item_group_name: "Frozen Food",
    item_group_image: "https://widam.akwad.qa/files/Frozen Food4af613.png",
    is_group: 1,
  },
  {
    item_group_id: "IG017",
    item_group_name: "Fruit & Vegetable",
    item_group_image:
      "https://widam.akwad.qa/files/OK_Fruits and Vegetables 1.png",
    is_group: 1,
  },
  {
    item_group_id: "IG018",
    item_group_name: "Lamb",
    item_group_image: "https://widam.akwad.qa/files/OK_Lamb.png",
    is_group: 1,
  },
  {
    item_group_id: "IG020",
    item_group_name: "Offal",
    item_group_image: "https://widam.akwad.qa/files/OK_Offal May be.png",
    is_group: 1,
  },
];

const Sidebar = ({ resetActiveTab }: { resetActiveTab: () => void }) => {
  const params = useSearchParams();
  const categoryId = params.get("category");

  return (
    <aside className="w-full bg-neutral-100 pt-5 pb-28 md:block hidden">
      <div className="flex flex-col space-y-6">
        <Link
          href={`/categories`}
          onClick={resetActiveTab}
          className={`relative flex flex-col items-center w-full p-4 transition-all duration-300 ease-in-out`}
        >
          {!categoryId && (
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-sky-500" />
          )}

          {/* Image and Text displayed vertically */}
          <div className="flex flex-col items-center">
            {/* White circular container behind the image */}
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
              <LayoutGrid className="text-[#292D32] w-10 h-10" />
            </div>
            <div
              className={`mt-2 text-lg font-medium text-center ${
                !categoryId ? "text-sky-500" : "text-neutral-800"
              }`}
            >
              All
            </div>
          </div>
        </Link>
        {categories.map((category) => {
          const isSelected = category.item_group_id === categoryId;
          return (
            <Link
              key={category.item_group_id}
              href={`/categories?category=${category.item_group_id}`}
              onClick={resetActiveTab}
              className={`relative flex flex-col items-center w-full p-4 transition-all duration-300 ease-in-out ${
                isSelected ? "" : ""
              }`}
            >
              {/* Left vertical line, always at the absolute left */}
              {isSelected && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-sky-500" />
              )}

              {/* Image and Text displayed vertically */}
              <div className="flex flex-col items-center">
                {/* White circular container behind the image */}
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                  <img
                    src={category.item_group_image}
                    alt={category.item_group_name}
                    className="w-16 h-16 object-cover rounded-full"
                  />
                </div>
                <div
                  className={`mt-2 text-lg font-medium text-center ${
                    isSelected ? "text-sky-500" : "text-neutral-800"
                  }`}
                >
                  {category.item_group_name}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
