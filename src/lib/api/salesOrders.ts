"use server";

import { cookies } from "next/headers";

interface SalesOrdersResponse {
  status_code: number;
  error: number;
  message: string;
  data: SalesOrder[];
}

interface SalesOrder {
  sales_order_id: string;
  status: string;
  // Add other relevant fields
}

async function getSalesOrders(
  sales_order_id?: string,
  open_orders?: string,
  past_orders?: string
): Promise<SalesOrdersResponse | undefined> {
  const url = new URL(
    `${process.env.API_BASE_URL}/api/method/widam_delivery.sales_order.sales_orders`
  );

  if (sales_order_id) url.searchParams.append("sales_order_id", sales_order_id);
  if (open_orders) url.searchParams.append("open_orders", open_orders);
  if (past_orders) url.searchParams.append("past_orders", past_orders);

  const requestOptions: RequestInit = {
    method: "GET",
    headers: {
      "Accept-Language": "en",
      Authorization: `token ${getTokenFromCookies()}`,
    },
    redirect: "follow",
  };

  try {
    const response = await fetch(url.toString(), requestOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result: SalesOrdersResponse = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching sales orders:", error);
  }
}

function getTokenFromCookies(): string {
  const cookiesStore = cookies();
  const token = cookiesStore.get("token")?.value;
  if (!token) {
    throw new Error("Authentication token not found in cookies.");
  }
  return token;
}

export { getSalesOrders };

export type { SalesOrdersResponse, SalesOrder };
