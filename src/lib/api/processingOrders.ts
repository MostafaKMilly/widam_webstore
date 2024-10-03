"use server";

import { getAuthToken } from "../helpers/getAuthToken";

interface ProcessingOrdersResponse {
  status_code: number;
  error: number;
  message: string;
  data: ProcessingOrder[];
}

interface ProcessingOrder {
  order_id: string;
  status: string;
  // Add other processing order fields as needed
}

const API_BASE_URL = process.env.API_BASE_URL;

// Get Processing Orders
async function getProcessingOrders(): Promise<
  ProcessingOrdersResponse | undefined
> {
  const url = `${API_BASE_URL}/api/method/widam_delivery.processing_order.processing_orders`;

  const requestOptions: RequestInit = {
    method: "GET",
    headers: {
      Authorization: `token ${getAuthToken()}`,
    },
    redirect: "follow",
  };

  try {
    const response = await fetch(url, requestOptions);
    const result: ProcessingOrdersResponse = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching processing orders:", error);
  }
}

export { getProcessingOrders };

export type { ProcessingOrdersResponse, ProcessingOrder };
