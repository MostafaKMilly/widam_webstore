"use client";
import React from "react";
import { useDictionary } from "@/lib/hooks/useDictionary";

const PaymentCards: React.FC = () => {
  const { dictionary } = useDictionary();

  return (
    <section
      className="flex flex-wrap gap-5 justify-center relative items-start px-20 pt-8 pb-14 mt-20 max-w-full bg-white rounded border border-gray-200 border-solid shadow-sm w-[1136px] max-md:px-5 max-md:mt-10"
      style={{
        border: "1px solid #ECECEC",
        boxShadow: "2px 2px 2.5px 0px rgba(0, 0, 0, 0.16)",
      }}
    >
      <div className="flex flex-col absolute left-12 top-8">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/6e8c4055527317d05ebdd43a690347ae924a3a38d5d92b225545c24a252f4bc8?placeholderIfAbsent=true&apiKey=9810db3822b54ab583e896edd833d595"
          className="object-contain aspect-square w-[37px]"
          alt=""
        />
      </div>

      <div className="flex flex-col items-center mt-2 font-medium text-center max-md:max-w-full">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/cc56214e8f5f27c5e193ee252261b71a239662a0a1a8ae03b6f895f1cebcb4cc?placeholderIfAbsent=true&apiKey=9810db3822b54ab583e896edd833d595"
          className="object-contain aspect-[1.02] w-[60px]"
          alt=""
        />
        <h3 className="mt-5 text-xl text-black">
          {dictionary["noPaymentCardsFound"]}
        </h3>
        <p className="self-stretch mt-2 text-lg lowercase text-neutral-500 max-md:max-w-full">
          <span className="text-neutral-500">{dictionary["your"]} </span>
          <span className="lowercase text-neutral-500">
            {dictionary["paymentCardsSaved"]}
          </span>
        </p>
      </div>
    </section>
  );
};

export default PaymentCards;
