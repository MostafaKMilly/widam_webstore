// components/Sidebar.tsx
"use client";
import React from "react";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import useUserStore from "@/lib/store/userStore"; // Import the user store
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/lib/api/profile";
import { useDictionary } from "@/lib/hooks/useDictionary";
import { updateLanguage } from "@/lib/actions/updateLanguage";

interface MenuItemProps {
  icon: string;
  text: string;
  href: string;
  isActive?: boolean;
  disabled?: boolean; // New prop to handle disabled state
  onClick?: () => void; // Optional click handler for disabled items
}

const MenuItem: React.FC<MenuItemProps> = ({
  icon,
  text,
  href,
  isActive = false,
  disabled = false,
  onClick,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    if (disabled) {
      e.preventDefault(); // Prevent navigation
      if (onClick) onClick(); // Trigger any additional action
    }
  };

  return (
    <Link
      href={href}
      className="flex items-center w-full"
      onClick={handleClick}
    >
      {isActive && (
        <div className="w-1 h-full bg-sky-900 rounded absolute top-0 left-0"></div>
      )}
      <div
        className={clsx(
          "flex gap-4 mt-8 ml-5 max-md:ml-2.5",
          isActive ? "text-sky-900" : "text-neutral-500",
          disabled && "opacity-50 cursor-not-allowed" // Apply styles for disabled state
        )}
      >
        <img
          loading="lazy"
          src={icon}
          className="object-contain w-5 aspect-square"
          alt={`${text} icon`}
        />
        <span
          className={clsx(
            "text-xl font-medium capitalize",
            isActive ? "text-sky-900" : "text-neutral-500"
          )}
        >
          {text}
        </span>
      </div>
    </Link>
  );
};

const Separator: React.FC = () => (
  <div className="shrink-0 mt-8 h-px border border-solid border-neutral-200" />
);

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { data: user, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getUser(),
  });

  const dict = useDictionary();
  const language = useUserStore((state) => state.language);
  const setLanguage = useUserStore((state) => state.setLanguage);

  const [isAddNumberOpen, setIsAddNumberOpen] = React.useState(false);

  const menuItems: MenuItemProps[] = [
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/60219ee10013d396ae0cfbf9ebabc6faa26abf9161da878ddf2496232090dfef?placeholderIfAbsent=true&apiKey=9810db3822b54ab583e896edd833d595",
      text: dict.dictionary.myAccount,
      href: "/settings",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/a66b425df2623e9eccede46d8de96cee533ae45a3ede8764b4a0211bad708d66?placeholderIfAbsent=true&apiKey=9810db3822b54ab583e896edd833d595",
      text: dict.dictionary.myProfile,
      href: "/settings/profile",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/543c797406e2f08ada4a018e62ae36d115c023ee79ca1fbee8959c0ca35b6f16?placeholderIfAbsent=true&apiKey=9810db3822b54ab583e896edd833d595",
      text: dict.dictionary.myOrders,
      href: "/settings/orders",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/d5cef386bc6c0cd58638085a3b9c4bab7744cbba34cfce623a8e9c77f1ee3db7?placeholderIfAbsent=true&apiKey=9810db3822b54ab583e896edd833d595",
      text: dict.dictionary.myAddresses,
      href: "/settings/addresses",
    },
  ];

  const handleDisabledClick = () => {
    setIsAddNumberOpen(true);
  };

  const handleLanguageChange = (selectedLanguage: string) => {
    setLanguage(selectedLanguage);
    updateLanguage(selectedLanguage as "en" | "ar");
  };

  return (
    <>
      <aside className="w-3/12 max-md:w-full">
        <nav
          className="flex flex-col pb-9 mx-auto w-full bg-white rounded max-md:mt-5"
          style={{
            border: "1px solid #ECECEC",
            boxShadow: "2px 2px 2.5px 0px rgba(0, 0, 0, 0.16)",
          }}
        >
          {menuItems.map((item, index) => (
            <div key={item.href} className="relative">
              <MenuItem
                {...item}
                isActive={item.href === pathname}
                disabled={!user?.data}
                onClick={handleDisabledClick}
              />
              {index < menuItems.length - 1 && <Separator />}
            </div>
          ))}

          <div className="flex flex-col gap-5 justify-between items-start self-center mt-56 w-80 max-w-full max-md:mt-10 px-5">
            <div className="text-xl font-semibold text-black">
              {dict.dictionary.settings}
            </div>
            <div className="flex justify-between items-center w-full mt-4">
              <div className="font-medium text-neutral-700">
                {dict.dictionary.language}
              </div>
              <select
                value={language}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="text-lg text-sky-900 bg-transparent border-none focus:outline-none"
              >
                <option value="en">English</option>
                <option value="ar">العربية</option>
                {/* Add more language options here */}
              </select>
            </div>
          </div>
          <Separator />
          <div className="flex justify-between self-center mt-7 px-5 w-[322px] max-w-full">
            <div className="text-xl text-neutral-700">
              {dict.dictionary.country}
            </div>
            <div className="text-lg text-sky-900">{dict.dictionary.qatar}</div>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
