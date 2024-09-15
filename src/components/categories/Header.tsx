// Header.tsx

"use client";
import React from "react";
import { Menu, MenuButton } from "@headlessui/react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { SubCategory } from "@/lib/queries/getItemGroups";

interface SortOption {
  id: number;
  label: string;
  sort_by: string;
  sort_order: "asc" | "desc";
}

const sortOptions: SortOption[] = [
  {
    id: 1,
    label: "Price High to Low",
    sort_by: "website_item_price",
    sort_order: "desc",
  },
  {
    id: 2,
    label: "Price Low to High",
    sort_by: "website_item_price",
    sort_order: "asc",
  },
  {
    id: 3,
    label: "Name A to Z",
    sort_by: "website_item_name",
    sort_order: "asc",
  },
  {
    id: 4,
    label: "Name Z to A",
    sort_by: "website_item_name",
    sort_order: "desc",
  },
];

interface HeaderProps {
  sub_categories: SubCategory[];
  item_group_id: string;
  activeTab: string;
  setActiveTab: (tabId: string) => void;
  selectedSortOption: SortOption;
  setSelectedSortOption: (option: SortOption) => void;
}

const Header: React.FC<HeaderProps> = ({
  sub_categories,
  item_group_id,
  activeTab,
  setActiveTab,
  selectedSortOption,
  setSelectedSortOption,
}) => {
  return (
    <header className="flex flex-col md:flex-row w-full mb-4">
      {/* Sort By Button with Dropdown */}
      <Menu
        as="div"
        className="relative inline-block text-left md:order-2 md:ml-auto mt-2 md:mt-0 px-4 md:px-0"
      >
        {({ open }) => (
          <>
            <div>
              <MenuButton className="flex items-center gap-2 px-6 py-3 text-xl font-medium text-white bg-sky-500 rounded-sm">
                <span>Sort By</span>
                {open ? (
                  <ChevronUp className="w-5 h-5 text-white" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-white" />
                )}
              </MenuButton>
            </div>

            <Menu.Items className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-md focus:outline-none z-10">
              <div className="py-1">
                {sortOptions.map((option) => (
                  <Menu.Item key={option.id}>
                    {({ active }) => (
                      <button
                        onClick={() => {
                          setSelectedSortOption(option);
                        }}
                        className={`${
                          active || selectedSortOption.id === option.id
                            ? "bg-sky-100 text-sky-900"
                            : "text-gray-700"
                        } block w-full text-left px-4 py-2 text-sm`}
                      >
                        {option.label}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </>
        )}
      </Menu>

      {/* Tabs Navigation */}
      {item_group_id !== "All Item Groups" && sub_categories?.length > 0 && (
        <nav className="flex-1 overflow-x-auto md:order-1">
          <ul className="flex justify-start md:gap-12 gap-4 px-4 md:px-8 text-xl font-medium text-neutral-500 border-b border-[#EFEEEE]">
            {sub_categories.map((tab) => (
              <li
                key={tab.item_group_id}
                className={`cursor-pointer whitespace-nowrap py-4 ${
                  activeTab === tab.item_group_id
                    ? "border-b-2 border-sky-500 text-sky-500"
                    : ""
                }`}
                onClick={() => setActiveTab(tab.item_group_id)}
              >
                {tab.item_group_name}
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
