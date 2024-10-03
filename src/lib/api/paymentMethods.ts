"use server";

import { getAuthToken } from "../helpers/getAuthToken";

interface PaymentMethodsResponse {
  status_code: number;
  error: number;
  message: string;
  data: PaymentMethod[];
}

interface PaymentMethod {
  payment_method_id: string;
  name: string;
  // Add other payment method fields as needed
}

const API_BASE_URL = process.env.API_BASE_URL;

// Get Payment Methods
async function getPaymentMethods(
  payment_method_id?: string
): Promise<PaymentMethodsResponse | undefined> {
  const url = new URL(
    `${API_BASE_URL}/api/method/widam_delivery.payment_method.payment_methods`
  );
  if (payment_method_id) {
    url.searchParams.append("payment_method_id", payment_method_id);
  }

  const requestOptions: RequestInit = {
    method: "GET",
    headers: {
      "Accept-Language": "ar",
      Authorization: `token ${getAuthToken()}`,
    },
    redirect: "follow",
  };

  try {
    const response = await fetch(url.toString(), requestOptions);
    const result: PaymentMethodsResponse = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching payment methods:", error);
  }
}

export { getPaymentMethods };

export type { PaymentMethodsResponse, PaymentMethod };
