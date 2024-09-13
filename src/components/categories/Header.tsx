"use client";
import React, { useState } from "react";
import { Menu, MenuButton } from "@headlessui/react";
import { ChevronDown, ChevronUp } from "lucide-react";

const tabs = [
  { id: 1, label: "Beef Meat" },
  { id: 2, label: "Chicken" },
  { id: 3, label: "Australian Meat" },
  { id: 4, label: "Camel Meat" },
  { id: 5, label: "Lamb Meat" },
];

const sortOptions = [
  { id: 1, label: "Price High to Low", value: "price_desc" },
  { id: 2, label: "Price Low to High", value: "price_asc" },
  { id: 3, label: "Name A to Z", value: "name_asc" },
  { id: 4, label: "Name Z to A", value: "name_desc" },
];

const Header: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [selectedSortOption, setSelectedSortOption] = useState(sortOptions[0]);

  return (
    <header className="flex justify-between items-center w-full max-md:max-w-full mb-4">
      {/* Tabs Navigation */}
      <nav className="flex-1">
        <ul className="flex justify-start gap-12 ml-8 max-w-full text-xl font-medium text-neutral-500">
          {tabs.map((tab) => (
            <li
              key={tab.id}
              className={`cursor-pointer py-2 ${
                activeTab === tab.id
                  ? "border-b-2 border-sky-500 text-sky-500"
                  : ""
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </li>
          ))}
        </ul>
      </nav>

      {/* Sort By Button with Dropdown */}
      <Menu as="div" className="relative inline-block text-left">
        {({ open }) => (
          <>
            <div>
              <MenuButton className="flex items-center gap-2 px-6 py-3 text-xl font-medium text-white bg-sky-500 rounded-sm max-md:px-5">
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
                          // Implement your sorting logic here
                        }}
                        className={`${
                          active ? "bg-sky-100 text-sky-900" : "text-gray-700"
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
    </header>
  );
};

export default Header;
