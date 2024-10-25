"use server";
import { cookies } from "next/headers";
import { WebsiteItem } from "../queries/getWebsiteItem";

interface QuotationIdResponse {
  status_code: number;
  error: number;
  message: string;
  data: Qutation;
}

export interface Qutation {
  quotation_id: string;
  date: string;
  currency: string;
  total: number;
  total_qty: number;
  total_net_weight: number;
  total_charges: number;
  total_discount_amount: number;
  grand_total: number;
  payment_token_id: any;
  payment_method: any;
  saved_card: any;
  split: number;
  pickup: number;
  mubadara: number;
  udhiyah: number;
  shipping_address_id: string;
  shipping_address_details: any;
  coupon_code: any;
  delivery_charges: Array<{
    delivery_method_id: string;
    delivery_charges: number;
    delivery_charges_account: string;
  }>;
  cart_content: {
    normal_delivery: {
      delivery_method_id: string;
      delivery_method_title: string;
      delivery_date: {
        date: string;
        date_formatted: string;
      };
      time_slot: {
        time_slot_id: string;
        time_formatted: string;
      };
      website_items: WebsiteItem[];
      delivery_charges: number;
      is_price_modifier: number;
      sub_total: number;
    };
  };
  order_total: {
    minimum_order_amount: number;
    remainder_amount: number;
  };
}
interface PlaceOrderResponse {
  status_code: number;
  error: number;
  message: string;
  data: {
    order_id: string;
    website_items: Array<{
      website_item_id: string;
      stock_uom: string;
      website_item_type: string;
      status: string;
      requires_preparation: number;
      min_qty: number;
      max_qty: number;
      popularity: number;
      website_item_name: string;
      website_item_short_name: string;
      website_item_image: string;
      description: string;
      short_description: string;
      web_long_description: string;
      price_modifier_title: string | null;
      is_express_item: number;
      is_pickup_item: number;
      is_mubadara_item: number;
      is_udhiya_item: number;
      is_price_modifier: number;
      tags: Array<{
        id: string;
        title: string;
        icon: string;
        product_label: number;
        color: string | null;
      }>;
      additional_images: Array<{
        image: string;
      }>;
      website_specifications: Array<unknown>;
      price: {
        website_item_price: number;
        discount_title: string | null;
        discount_percent: number;
        discount_amount: number;
        discounted_price: number;
        currency: string;
      };
      in_stock: number;
      product_options: Array<unknown>;
      qty_in_cart: number;
    }>;
    sub_total: number;
    delivery_charges: number;
    grand_total: number;
    currency: string;
  };
}

interface ReorderResponse {
  status_code: number;
  error: number;
  message: string;
  data: {
    new_order_id: string;
  };
}

interface QuotationIdRequest {
  split?: string;
  pickup?: string;
  website_items: string;
  qid_field_placeholder?: string;
  file?: File;
  shipping_address_id?: string;
  delivery_date?: string;
  time_slot?: string;
  geofence?: string;
  payment_method?: string;
}

interface PlaceOrderRequest {
  payment_method?: string;
  _lang?: string;
  create_token?: string;
  quotation_id: string;
}

interface ReorderRequest {
  sales_order_id?: string;
}

async function getQuotationId(
  requestData: QuotationIdRequest
): Promise<QuotationIdResponse | undefined> {
  const url = `${process.env.API_BASE_URL}/api/method/widam_delivery.quotation.quotation_id`;

  const formData = new FormData();
  if (requestData.split) formData.append("split", requestData.split);
  if (requestData.pickup) formData.append("pickup", requestData.pickup);
  formData.append("website_items", requestData.website_items);
  if (requestData.qid_field_placeholder)
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

async function updateQuotation(
  requestData: Partial<QuotationIdRequest>
): Promise<QuotationIdResponse | undefined> {
  const url = `${process.env.API_BASE_URL}/api/method/widam_delivery.quotation.quotation_id`;

  const formData = new FormData();

  if (requestData.split) formData.append("split", requestData.split);
  if (requestData.pickup) formData.append("pickup", requestData.pickup);

  if (requestData.website_items) {
    formData.append("website_items", requestData.website_items);
  }

  if (requestData.qid_field_placeholder)
    formData.append("qid_field_placeholder", requestData.qid_field_placeholder);

  if (requestData.file) {
    formData.append("file", requestData.file);
  }

  // Append additional fields
  if (requestData.shipping_address_id)
    formData.append("shipping_address_id", requestData.shipping_address_id);

  if (requestData.delivery_date)
    formData.append("delivery_date", requestData.delivery_date);

  if (requestData.time_slot)
    formData.append("time_slot", requestData.time_slot);

  if (requestData.geofence) formData.append("geofence", requestData.geofence);

  if (requestData.payment_method)
    formData.append("payment_method", requestData.payment_method);

  const requestOptions: RequestInit = {
    method: "PUT",
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
    console.error("Error updating quotation:", error);
  }
}

async function deleteQuotation({
  quotation_id,
}: {
  quotation_id: string;
}): Promise<QuotationIdResponse | undefined> {
  const url = `${process.env.API_BASE_URL}/api/method/widam_delivery.quotation.quotation_id`;

  const formData = new URLSearchParams();
  formData.append("quotation_id", quotation_id);

  const requestOptions: RequestInit = {
    method: "DELETE",
    headers: {
      Authorization: `token ${getTokenFromCookies()}`,
    },
    body: formData,
  };

  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result: QuotationIdResponse = await response.json();
    return result;
  } catch (error) {
    console.error("Error deleting quotation:", error);
  }
}

async function getQuotationDetails(): Promise<QuotationIdResponse | undefined> {
  const url = `${process.env.API_BASE_URL}/api/method/widam_delivery.quotation.quotation_id`;

  const requestOptions: RequestInit = {
    method: "GET",
    headers: {
      Authorization: `token ${getTokenFromCookies()}`,
    },
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
    console.error("Error fetching quotation details:", error);
  }
}

async function placeOrder(
  requestData: PlaceOrderRequest
): Promise<PlaceOrderResponse | undefined> {
  const url = `${process.env.API_BASE_URL}/api/method/widam_delivery.checkout.place_order`;

  console.log(requestData);
  const formData = new URLSearchParams();
  formData.append("quotation_id", requestData.quotation_id);
  if (requestData.payment_method) {
    formData.append("payment_method", requestData.payment_method);
  }
  if (requestData._lang) formData.append("_lang", requestData._lang);
  if (requestData.create_token) {
    formData.append("create_token", requestData.create_token);
  }

  console.log(getTokenFromCookies());

  const requestOptions: RequestInit = {
    method: "POST",
    headers: {
      Authorization: `token ${getTokenFromCookies()}`,
    },
    body: formData,
  };

  try {
    const response = await fetch(url, requestOptions);
    const result: PlaceOrderResponse = await response.json();
    if (!response.ok) {
      console.log(response);
      throw new Error(
        `HTTP error! status: ${response.status} - ${result.message}`
      );
    }
    return result;
  } catch (error) {
    console.error("Error placing order:", error);
    throw error; // Rethrow the error to be caught in the mutation
  }
}

async function reorder(
  requestData: ReorderRequest
): Promise<ReorderResponse | undefined> {
  const url = `${process.env.API_BASE_URL}/api/method/widam_delivery.reorder.reorder`;

  const formData = new URLSearchParams();
  if (requestData.sales_order_id) {
    formData.append("sales_order_id", requestData.sales_order_id);
  }

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
  updateQuotation,
  deleteQuotation,
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
