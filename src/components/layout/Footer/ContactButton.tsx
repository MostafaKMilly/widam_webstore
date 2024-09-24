import React from "react";

const ContactButton: React.FC = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-5 justify-between self-start px-4 py-3 mt-2.5 ml-0 font-medium text-center max-md:items-center bg-[#003B82] rounded w-full sm:w-auto">
      <div className="text-sm leading-4 text-white">
        <span className="text-white">We&apos;re alwa</span>ys <br /> here to
        help!
      </div>
      <a
        href="tel:2688790"
        className="flex gap-2.5 my-auto text-xl text-white whitespace-nowrap"
      >
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/07ba7ba8c24aa3f7fa4af61c1829cc3be04b5b0efce4f4c63f0909196cb0e3e6?apiKey=9810db3822b54ab583e896edd833d595&&apiKey=9810db3822b54ab583e896edd833d595"
          alt=""
          className="object-contain shrink-0 aspect-[1.04] w-[26px]"
        />
        <span>2688790</span>
      </a>
    </div>
  );
};

export default ContactButton;
