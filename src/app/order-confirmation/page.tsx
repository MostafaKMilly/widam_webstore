// SalesOrderInfo.tsx
import OrderConfirmation from "@/components/cart/OrderConfirmation";
import { getSalesOrders, SalesOrder } from "@/lib/api/salesOrders";
import React from "react";

interface SalesOrderInfoProps {
  searchParams: { order_id: string };
}

async function SalesOrderInfo({ searchParams }: SalesOrderInfoProps) {
  const { order_id } = searchParams;
  const data = await getSalesOrders(order_id);

  console.log(data, "mostafa");
  if (!data || !data.data) {
    return <div>No order found.</div>;
  }

  const order = data.data as SalesOrder;

  console.log(JSON.stringify(order));
  return <OrderConfirmation order={order} />;
}

export default SalesOrderInfo;
