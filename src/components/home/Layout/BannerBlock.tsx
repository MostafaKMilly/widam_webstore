"use client";
import React, { useState, Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react"; // Import Heroicons
import Image from "next/image";
import Slider from "react-slick"; // Import React Slick

import "slick-carousel/slick/slick.css"; // Slick carousel styles
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeftIcon, ChevronRightIcon, XIcon } from "lucide-react";

// Custom Previous Arrow
const PrevArrow = ({ onClick }: { onClick?: () => void }) => (
  <button
    onClick={onClick}
    className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white text-sky-500 rounded-full p-2 z-10"
    aria-label="Previous"
  >
    <ChevronLeftIcon className="h-5 w-5" />
  </button>
);

// Custom Next Arrow
const NextArrow = ({ onClick }: { onClick?: () => void }) => (
  <button
    onClick={onClick}
    className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white text-sky-500 rounded-full p-2 z-10"
    aria-label="Next"
  >
    <ChevronRightIcon className="h-5 w-5" />
  </button>
);

interface BannerBlockProps {
  block: {
    background: string;
    show_title: number;
    show_title_block: number;
    icon: string | null;
    popups: number;
    data: Array<{
      banner_type: string;
      banner_link: string;
      banner_image: string;
      udhiyah: number;
    }>;
  };
}

const BannerBlock: React.FC<BannerBlockProps> = ({ block }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSelectedLocation = localStorage.getItem("hasOpenedDialog");

    if (block.popups === 1 && hasSelectedLocation === "true") {
      setIsOpen(true);
    }
  }, [block.popups]);

  const closeModal = () => {
    setIsOpen(false);
  };

  const renderBannerContent = () => {
    if (block.data.length === 1) {
      const banner = block.data[0];
      return (
        <div className="w-full max-h-[400px]">
          <a
            href={banner.banner_link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={banner.banner_image}
              alt={banner.banner_type}
              layout="responsive"
              width={1200}
              height={600}
              className="rounded shadow-md w-full object-cover max-h-[400px]" // Restrict height and make it responsive
            />
          </a>
        </div>
      );
    } else {
      // If there are multiple banners, use the Slick carousel
      const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        nextArrow: <NextArrow />, // Use custom next arrow
        prevArrow: <PrevArrow />, // Use custom previous arrow
      };

      return (
        <Slider {...settings}>
          {block.data.map((banner, index) => (
            <div key={index} className="w-full max-h-[400px] relative">
              <a
                href={banner.banner_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={banner.banner_image}
                  alt={banner.banner_type}
                  layout="responsive"
                  width={1200}
                  height={600}
                  className="rounded shadow-md w-full object-cover max-h-[400px]"
                />
              </a>
            </div>
          ))}
        </Slider>
      );
    }
  };

  if (block.popups === 1) {
    return (
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative">
                <div className="absolute -top-5 -right-5 m-2">
                  <button
                    onClick={closeModal}
                    className="bg-black rounded-full p-2 flex items-center justify-center"
                  >
                    <XIcon className="h-4 w-4 text-white" />
                  </button>
                </div>

                <div>
                  {block.data.map((banner, index) => (
                    <a
                      key={index}
                      href={banner.banner_link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image
                        src={banner.banner_image}
                        alt={banner.banner_type}
                        layout="intrinsic"
                        width={1200}
                        height={800}
                        className="w-auto h-auto max-h-screen object-contain"
                      />
                    </a>
                  ))}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    );
  }

  return (
    <div
      className="p-8 rounded"
      style={{ backgroundColor: block.background || "#fff" }}
    >
      {renderBannerContent()}
    </div>
  );
};

export default BannerBlock;
