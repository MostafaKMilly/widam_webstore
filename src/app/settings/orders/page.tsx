"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getSalesOrders, SalesOrder } from "@/lib/api/salesOrders";
import OrderItemComponent from "@/components/cart/OrderItem";
import { LoadingComponent } from "@/components/layout/LoadingComponent";
import { ErrorComponent } from "@/components/layout/ErrorComponent";

const OrdersPage: React.FC = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["orders"],
    queryFn: () => getSalesOrders(),
  });

  if (isLoading) return <LoadingComponent />;
  if (error) return <ErrorComponent message="Error loading orders data." />;

  const ordersData = data?.data;

  let orders: SalesOrder[] = [];

  if (ordersData) {
    if ("orders" in ordersData) {
      orders = ordersData.orders;
    } else {
      orders = [ordersData as SalesOrder];
    }
  }

  return (
    <div className="container mx-auto p-4  mb-12">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full">
          <header className="self-start text-[#003b82] text-xl font-semibold capitalize mb-2">
            My Order
          </header>

          <div className="flex flex-col relative gap-4  ">
            {orders.length === 0 ? (
              <p>No orders found.</p>
            ) : (
              orders.map((order: SalesOrder) => (
                <OrderItemComponent key={order.sales_order_id} order={order} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
