"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

const NavigationMobileDrawer: React.FC<{ categories: string[] }> = ({
  categories,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button className="md:hidden p-2" onClick={() => setIsOpen(true)}>
        <img src="/icons/three-lines-icon.svg" alt="Menu" />
      </button>

      <img src="/icons/three-lines-icon.svg" alt="Menu" />
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
              <Dialog.Panel className="relative w-full bg-white p-6 shadow-lg">
                <button
                  className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-800"
                  onClick={() => setIsOpen(false)}
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
                <div className="mt-4 space-y-4">
                  {categories.map((category, index) => (
                    <div
                      key={index}
                      className="text-xl font-semibold text-sky-900 capitalize"
                    >
                      {category}
                    </div>
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
