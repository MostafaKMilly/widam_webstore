// components/cart/PaymentMethod.tsx

import type { PaymentMethod } from "@/lib/api/paymentMethods";
import React from "react";

interface PaymentMethodProps {
  selectedOption: string | null;
  onOptionSelect: (id: string) => void;
  paymentOptions: PaymentMethod[];
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({
  selectedOption,
  onOptionSelect,
  paymentOptions,
}) => {
  return (
    <section className="flex flex-col rounded-none border border-[#BEBEBE]">
      <div className="flex overflow-hidden relative flex-col px-8 py-8 w-full fill-white min-h-[558px] stroke-[1px] stroke-stone-300 max-md:px-5 max-md:max-w-full">
        <h1 className="text-[#232323] text-[20px] font-semibold ">
          Payment Method
        </h1>

        {paymentOptions.length === 0 ? (
          <p>No payment methods available.</p>
        ) : (
          paymentOptions.map((option) => (
            <div
              key={option.payment_method_id}
              className={`flex relative gap-4 px-8 py-4 mt-6 text-base font-medium text-black rounded-sm border border-solid bg-slate-50 cursor-pointer hover:bg-slate-100 ${
                selectedOption === option.payment_method_id
                  ? "border-2 border-blue-500"
                  : "border-stone-300"
              }`}
              onClick={() => onOptionSelect(option.payment_method_id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  onOptionSelect(option.payment_method_id);
                }
              }}
              role="button"
              tabIndex={0}
              aria-pressed={selectedOption === option.payment_method_id}
            >
              <div className="flex-shrink-0">
                {option.icon ? (
                  <img
                    src={option.icon}
                    alt={`${option.title} icon`}
                    className="w-16 h-16 object-contain"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gray-200 rounded"></div>
                )}
              </div>
              <div className="flex flex-col justify-center">
                <span className="capitalize text-black text-lg font-semibold">
                  {option.title}
                </span>
                <span className="text-sm text-gray-600">
                  {option.description}
                </span>
                {option.payment_surcharge > 0 && (
                  <span className="text-sm text-gray-600">
                    Surcharge: ${option.payment_surcharge.toFixed(2)}
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default PaymentMethod;
