"use server";

import { getAuthToken } from "../helpers/getAuthToken";

interface CouponCodesResponse {
  status_code: number;
  error: number;
  message: string;
  data: CouponCode[];
}

interface CouponCode {
  coupon_code_id: string;
  description: string;
  discount: number;
  // Add other coupon code fields as needed
}

const API_BASE_URL = process.env.API_BASE_URL;

// Get Coupon Codes
async function getCouponCodes(
  coupon_code_id?: string
): Promise<CouponCodesResponse | undefined> {
  const url = new URL(
    `${API_BASE_URL}/api/method/widam_delivery.coupon_code.coupon_codes`
  );
  if (coupon_code_id) {
    url.searchParams.append("coupon_code_id", coupon_code_id);
  }

  const requestOptions: RequestInit = {
    method: "GET",
    headers: {
      "Accept-Language": "en",
      Authorization: `token ${getAuthToken()}`,
    },
    redirect: "follow",
  };

  try {
    const response = await fetch(url.toString(), requestOptions);
    const result: CouponCodesResponse = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching coupon codes:", error);
  }
}

export async function applyCouponToCart(couponCode: string): Promise<void> {
  const url = `${API_BASE_URL}/api/method/widam_delivery.coupon_code.coupon_codes`;
  const requestOptions: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `token ${getAuthToken()}`,
    },
    body: JSON.stringify({ coupon_code: couponCode }),
  };

  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error applying coupon:", error);
    throw error;
  }
}

export { getCouponCodes };

export type { CouponCodesResponse, CouponCode };
