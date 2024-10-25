// /lib/api/paymentMethods.ts
"use server";

import { cookies } from "next/headers";
import { getAuthToken } from "../helpers/getAuthToken";

interface PaymentMethodsResponse {
  status_code: number;
  error: number;
  message: string;
  data: { payment_methods: Array<PaymentMethod> };
}

export interface PaymentMethod {
  payment_method_id: string;
  enabled: number;
  icon: string;
  priority: number;
  title: string;
  description: string;
  payment_surcharge: number;
  processor: string;
  gateway_settings?: string;
  payment_type?: string;
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
  const langauge = cookies().get("langauge")?.value;

  const requestOptions: RequestInit = {
    method: "GET",
    headers: {
      "Accept-Language": langauge || "en",
      Authorization: `token ${getTokenFromCookies()}`,
    },
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

function getTokenFromCookies(): string {
  const cookiesStore = cookies();
  const token = cookiesStore.get("token")?.value;
  if (!token) {
    throw new Error("Authentication token not found in cookies.");
  }
  return token;
}

export type { PaymentMethodsResponse };
