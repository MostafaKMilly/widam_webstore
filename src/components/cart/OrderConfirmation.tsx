"use client";
import React from "react";
import { CheckCircle } from "lucide-react";
import { SalesOrder } from "@/lib/api/salesOrders";
import Link from "next/link";

interface OrderItemProps {
  name: string;
  quantity: string;
  amount: string;
}

interface OrderSummaryItemProps {
  label: string;
  amount: string;
  isBold?: boolean;
}

interface OrderConfirmationProps {
  order: SalesOrder;
}

const OrderItem: React.FC<OrderItemProps> = ({ name, quantity, amount }) => (
  <div className="flex justify-between items-center py-4">
    <div>
      <h4 className="text-lg  text-[#888888]">{name}</h4>
      <p className="text-sm text-[#888888]">{quantity}</p>
    </div>
  </div>
);

const OrderSummaryItem: React.FC<OrderSummaryItemProps> = ({
  label,
  amount,
  isBold,
}) => (
  <div className="flex justify-between py-2">
    <span className={`text-base ${isBold ? "font-semibold" : "text-gray-600"}`}>
      {label}
    </span>
    <span className={`text-base ${isBold ? "font-semibold" : "text-gray-900"}`}>
      {amount} QAR
    </span>
  </div>
);

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ order }) => {
  const orderItems = order.items.map((item) => ({
    name: item.website_item_name,
    quantity: `${item.quantity} KG`,
    amount: `${item.quantity}`,
  }));

  const shippingFees = order.delivery_charges.reduce(
    (total, charge) => total + charge.delivery_charges,
    0
  );

  const totalAmount = order.grand_total + shippingFees;

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Confirmation Icon and Message */}
      <div className="flex flex-col items-center text-center">
        <img src="/icons/Group 6771.svg" className="w-32 h-32 mb-4" />
        <h1 className="mt-4 text-2xl font-bold text-gray-800">
          Confirmation Ordered Successfully
        </h1>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        {/* Order Summary */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Order Summary
          </h2>
          <div className="bg-[#F7F9FE] p-4">
            <div>
              <span className="text-[#0b0a0a] text-xl font-medium ">Items</span>
              <span className="text-[#0b0a0a] text-xl font-medium ">
                {" "}
                in your order
              </span>
            </div>

            <div>
              {orderItems.map((item, index) => (
                <>
                  <OrderItem key={index} {...item} />
                  {index !== orderItems.length - 1 && (
                    <div className="w-full h-[0px]  border border-[#88888829]"></div>
                  )}
                </>
              ))}
            </div>
            <div className="mt-4 border-t  border-[#88888829]  pt-4">
              <OrderSummaryItem
                label="Subtotal"
                amount={`${order.grand_total}`}
              />
              <OrderSummaryItem
                label="Shipping Fees"
                amount={`${shippingFees}`}
              />
              <OrderSummaryItem
                label="Total"
                amount={`${totalAmount}`}
                isBold
              />
            </div>
          </div>
        </div>

        {/* Order Details and Actions */}
        <div className="bg-white p-6 rounded shadow flex flex-col justify-between h-[321px] px-12">
          <div>
            <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
              <div className="border border-gray-300 rounded p-4 w-full sm:w-5/12 mb-4 sm:mb-0 sm:mr-2">
                <h3 className="text-md font-medium text-gray-700">
                  Order Amount
                </h3>
                <p className="mt-2 text-xl font-semibold text-gray-900">
                  {totalAmount} QAR
                </p>
              </div>
              <div className="border border-gray-300 rounded p-4 w-full sm:w-5/12 sm:ml-2">
                <h3 className="text-md font-medium text-gray-700">
                  Order Number
                </h3>
                <p className="mt-2 text-xl font-semibold text-gray-900">
                  {order.sales_order_id}
                </p>
              </div>
            </div>
          </div>

          <Link
            href={"/"}
            className="mt-4 w-fit  inline-block text-center bg-[#05B] self-center text-white px-16 py-3 rounded font-medium hover:bg-blue-700"
          >
            Keep Shopping
          </Link>
        </div>
      </div>
    </main>
  );
};

export default OrderConfirmation;
