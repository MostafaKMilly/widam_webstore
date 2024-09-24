// components/layout/Navigation/Navigation.tsx
"use client";
import React, { useState, useEffect } from "react";
import CategoryList from "./CategoryList";
import useScrollDirection from "@/lib/hooks/useScrollDirection";

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
    item_group_image: "https://widam.akwad.qa/files/chicken%2033.png",
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
    item_group_image: "https://widam.akwad.qa/files/Frozen%20Food4af613.png",
    is_group: 1,
  },
  {
    item_group_id: "IG017",
    item_group_name: "Fruit & Vegetable",
    item_group_image:
      "https://widam.akwad.qa/files/OK_Fruits%20and%20Vegetables%201.png",
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
    item_group_image: "https://widam.akwad.qa/files/OK_Offal%20May%20be.png",
    is_group: 1,
  },
];

const Navigation: React.FC = () => {
  const scrollDir = useScrollDirection();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (scrollDir === "down") {
      setVisible(false);
    } else {
      setVisible(true);
    }
  }, [scrollDir]);

  return (
    <nav
      className={`fixed top-16 left-0 w-full bg-neutral-100 -z-10 shadow-[0px_0px_2px_rgba(0,0,0,0.161)] transition-transform duration-300 ${
        visible ? "translate-y-9" : "-translate-y-full"
      }`}
    >
      <div className="flex flex-col justify-center items-center px-4 py-6 max-md:pb-2 md:px-16">
        <div className="flex flex-wrap gap-5 justify-between w-full max-w-[1680px]">
          <CategoryList categories={categories} />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
