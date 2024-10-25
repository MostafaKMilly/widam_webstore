// In OrderSummary.tsx

import React from "react";

interface OrderSummaryProps {
  cartTotal: number;
  shippingFee: number;
  discount: number;
  serviceFee: number;
  grandTotal: number;
  onPlaceOrder: () => void; // New prop
  loading: boolean;
}

interface SummaryItem {
  label: string;
  amount: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  cartTotal,
  shippingFee,
  discount,
  serviceFee,
  onPlaceOrder, // Destructure the new prop,
  grandTotal,
  loading,
}) => {
  const summaryItems: SummaryItem[] = [
    { label: "Cart Total", amount: cartTotal },
    { label: "Shipping Fee", amount: shippingFee },
    { label: "Discount", amount: discount },
    { label: "Service Fee", amount: serviceFee },
  ];

  const total = grandTotal;

  return (
    <section className="flex flex-col rounded-none max-w-[692px] bg-[#F8FBFF] border-[#BEBEBE] border">
      <div className="flex relative flex-col py-14 w-full  shadow-[0px_0px_8px_rgba(0,0,0,0.051)] max-md:max-w-full">
        <div className="flex relative flex-col items-start px-10 w-full text-2xl font-medium max-md:px-5 max-md:max-w-full">
          <h1 className="text-2xl font-bold text-neutral-800">Order Summary</h1>
          <div className="flex flex-col items-start mt-12 ml-3 text-neutral-700 max-md:mt-10 max-md:ml-2.5 w-full">
            {summaryItems.map((item, index) => (
              <div
                key={index}
                className="flex justify-between w-full mt-5 first:mt-0 text-xl"
              >
                <div>{item.label}</div>
                <div className="self-end">{item.amount.toFixed(2)} QAR</div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex relative items-center flex-row justify-between px-12 mt-8 w-full text-2xl font-bold text-neutral-800 max-md:px-5 max-md:max-w-full">
          <div className="self-start text-xl font-bold text-neutral-700 pl-2">
            Total
          </div>
          <div className="self-end  text-xl -mr-4">{total.toFixed(2)} QAR</div>
        </div>

        <div className="flex relative z-10 flex-col -mt-2  max-w-full w-full justify-center items-center">
          <button
            onClick={onPlaceOrder} // Call the handlePlaceOrder function
            disabled={loading} // Disable button when loading
            className={`px-2 py-2 mt-14 max-w-full text-xl font-semibold text-white capitalize bg-[#0050B3] rounded w-[300px] max-md:px-5 max-md:mt-10 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Placing Order..." : "PLACE ORDER"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default OrderSummary;
