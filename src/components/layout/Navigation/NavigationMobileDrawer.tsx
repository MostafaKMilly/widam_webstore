"use client";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "lucide-react";
import { Fragment, useState } from "react";
import Link from "next/link";

interface Category {
  item_group_id: string;
  item_group_name: string;
  item_group_image: string | null;
  is_group: number;
}

const NavigationMobileDrawer: React.FC<{ categories: Category[] }> = ({
  categories,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button className="md:hidden p-2" onClick={() => setIsOpen(true)}>
        <img src="/icons/three-lines-icon.svg" alt="Menu" />
      </button>

      <Transition show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-hidden"
          onClose={() => setIsOpen(false)}
        >
          <div className="absolute inset-0 flex justify-end">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="relative w-full max-w-xs bg-white p-6 shadow-lg">
                {/* Close button */}
                <button
                  className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-800"
                  onClick={() => setIsOpen(false)}
                >
                  <XIcon className="h-6 w-6" />
                </button>
                {/* Category list */}
                <div className="mt-4 space-y-4">
                  {categories.map((category) => (
                    <Link
                      key={category.item_group_id}
                      href={`/categories?category=${category.item_group_id}`}
                      className="flex items-center space-x-4 text-xl font-semibold text-sky-900 capitalize"
                      onClick={() => setIsOpen(false)}
                    >
                      {category.item_group_image && (
                        <img
                          src={category.item_group_image}
                          alt={category.item_group_name}
                          className="w-8 h-8 object-cover"
                        />
                      )}
                      <span>{category.item_group_name}</span>
                    </Link>
                  ))}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default NavigationMobileDrawer;
