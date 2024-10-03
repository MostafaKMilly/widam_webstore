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
  coupon_code_id: string
): Promise<CouponCodesResponse | undefined> {
  const url = new URL(
    `${API_BASE_URL}/api/method/widam_delivery.coupon_code.coupon_codes`
  );
  url.searchParams.append("coupon_code_id", coupon_code_id);

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

export { getCouponCodes };

export type { CouponCodesResponse, CouponCode };
