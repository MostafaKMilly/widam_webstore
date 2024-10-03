"use server";

import { cookies } from "next/headers";

interface QuotationIdResponse {
  status_code: number;
  error: number;
  message: string;
  data: {
    quotation_id: string;
    // Add other relevant fields
  };
}

interface PlaceOrderResponse {
  status_code: number;
  error: number;
  message: string;
  data: {
    order_id: string;
    // Add other relevant fields
  };
}

interface ReorderResponse {
  status_code: number;
  error: number;
  message: string;
  data: {
    new_order_id: string;
    // Add other relevant fields
  };
}

interface QuotationIdRequest {
  split: string;
  pickup: string;
  website_items: string; // JSON string
  qid_field_placeholder: string;
  file?: File;
}

interface PlaceOrderRequest {
  quotation_id: string;
  payment_method?: string;
  _lang: string;
  create_token?: string;
}

interface ReorderRequest {
  sales_order_id: string;
}

async function getQuotationId(
  requestData: QuotationIdRequest
): Promise<QuotationIdResponse | undefined> {
  const url = `${process.env.API_BASE_URL}/api/method/widam_delivery.quotation.quotation_id`;

  const formData = new FormData();
  formData.append("split", requestData.split);
  formData.append("pickup", requestData.pickup);
  formData.append("website_items", requestData.website_items);
  formData.append("qid_field_placeholder", requestData.qid_field_placeholder);
  if (requestData.file) {
    formData.append("file", requestData.file);
  }

  const requestOptions: RequestInit = {
    method: "POST",
    headers: {
      Authorization: `token ${getTokenFromCookies()}`,
    },
    body: formData,
    redirect: "follow",
  };

  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result: QuotationIdResponse = await response.json();
    return result;
  } catch (error) {
    console.error("Error getting quotation ID:", error);
  }
}

async function updateQuotationId(
  requestData: Partial<QuotationIdRequest> & { quotation_id: string }
): Promise<QuotationIdResponse | undefined> {
  const url = `${process.env.API_BASE_URL}/api/method/widam_delivery.quotation.quotation_id`;

  const formData = new URLSearchParams();
  Object.entries(requestData).forEach(([key, value]) => {
    if (value !== undefined) {
      formData.append(key, String(value));
    }
  });

  const requestOptions: RequestInit = {
    method: "PUT",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `token ${getTokenFromCookies()}`,
    },
    body: formData.toString(),
    redirect: "follow",
  };

  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result: QuotationIdResponse = await response.json();
    return result;
  } catch (error) {
    console.error("Error updating quotation ID:", error);
  }
}

async function deleteQuotationId(
  quotation_id: string
): Promise<QuotationIdResponse | undefined> {
  const url = `${process.env.API_BASE_URL}/api/method/widam_delivery.quotation.quotation_id`;

  const formData = new URLSearchParams();
  formData.append("quotation_id", quotation_id);

  const requestOptions: RequestInit = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `token ${getTokenFromCookies()}`,
    },
    body: formData.toString(),
    redirect: "follow",
  };

  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result: QuotationIdResponse = await response.json();
    return result;
  } catch (error) {
    console.error("Error deleting quotation ID:", error);
  }
}

async function getQuotationDetails(
  quotation_id: string
): Promise<QuotationIdResponse | undefined> {
  const url = `${process.env.API_BASE_URL}/api/method/widam_delivery.quotation.quotation_id`;

  const requestOptions: RequestInit = {
    method: "GET",
    headers: {
      Authorization: `token ${getTokenFromCookies()}`,
    },
    redirect: "follow",
  };

  try {
    const response = await fetch(
      `${url}?quotation_id=${encodeURIComponent(quotation_id)}`,
      requestOptions
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result: QuotationIdResponse = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching quotation details:", error);
  }
}

async function placeOrder(
  requestData: PlaceOrderRequest
): Promise<PlaceOrderResponse | undefined> {
  const url = `${process.env.API_BASE_URL}/api/method/widam_delivery.checkout.place_order`;

  const formData = new URLSearchParams();
  formData.append("quotation_id", requestData.quotation_id);
  if (requestData.payment_method) {
    formData.append("payment_method", requestData.payment_method);
  }
  formData.append("_lang", requestData._lang);
  if (requestData.create_token) {
    formData.append("create_token", requestData.create_token);
  }

  const requestOptions: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept-Language": "en",
    },
    body: formData.toString(),
    redirect: "follow",
  };

  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result: PlaceOrderResponse = await response.json();
    return result;
  } catch (error) {
    console.error("Error placing order:", error);
  }
}

async function reorder(
  requestData: ReorderRequest
): Promise<ReorderResponse | undefined> {
  const url = `${process.env.API_BASE_URL}/api/method/widam_delivery.reorder.reorder`;

  const formData = new URLSearchParams();
  formData.append("sales_order_id", requestData.sales_order_id);

  const requestOptions: RequestInit = {
    method: "PUT",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `token ${getTokenFromCookies()}`,
    },
    body: formData.toString(),
    redirect: "follow",
  };

  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result: ReorderResponse = await response.json();
    return result;
  } catch (error) {
    console.error("Error reordering:", error);
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

export {
  getQuotationId,
  updateQuotationId,
  deleteQuotationId,
  getQuotationDetails,
  placeOrder,
  reorder,
};

export type {
  QuotationIdResponse,
  PlaceOrderResponse,
  ReorderResponse,
  QuotationIdRequest,
  PlaceOrderRequest,
  ReorderRequest,
};
