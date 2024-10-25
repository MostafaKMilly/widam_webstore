"use server";

import { cookies } from "next/headers";

interface SalesOrdersResponse {
  status_code: number;
  error: number;
  message: string;
  pagination: {
    current_page: number;
    items_per_page: number;
    total_items: number;
    total_pages: number;
  };
  data:
    | {
        orders: SalesOrder[];
        orders_statuses: string[];
      }
    | SalesOrder;
}

export interface SalesOrder {
  sales_order_id: string;
  sales_order_date: string;
  time: string;
  status: string;
  grand_total: number;
  currency: string;
  per_billed: number;
  per_picked: number;
  order_delivery_status: string;
  per_delivered: number;
  delivery_charges: DeliveryCharge[];
  delivery_note: DeliveryNote;
  delivery_trip: DeliveryTrip;
  items: SalesOrderItem[];
  address: Address;
  payment_method: PaymentMethod;
  delivery_date: DeliveryDate;
  time_slot: TimeSlot;
}

interface DeliveryCharge {
  delivery_method_id: string;
  delivery_method_title: string;
  delivery_charges: number;
  delivery_charges_account: string;
}

interface DeliveryNote {
  name: string;
  posting_date: string;
  posting_time: string;
  status: string;
}

interface DeliveryTrip {
  status: string;
  driver_name: string;
  driver_address: Address;
  driver_cell_number: string;
}

interface SalesOrderItem {
  website_item_id: string;
  website_item_name: string;
  image_view: string;
  quantity: number;
}

interface Address {
  customer_id?: string;
  full_name: string;
  address_id: string;
  address_title: string;
  address_type: string;
  street_no: string;
  building_no: string;
  city: {
    city_id: string;
    city_name: string;
  };
  zone: string;
  area: {
    area_id: string;
    area_name: string;
  };
  country: {
    country_id: string;
    country_name: string;
  };
  geofence: {
    geofence_id: string;
    geofence_name: string;
  };
  phone: string;
  latitude: string;
  longitude: string;
  landmark: string | null;
  customer_fullname?: string;
}

interface PaymentMethod {
  payment_method_id: string;
  enabled: number;
  icon: string;
  priority: number;
  title: string;
  description: string;
  payment_surcharge: number;
  processor: string;
}

interface DeliveryDate {
  date: string;
  date_formatted: string;
}

interface TimeSlot {
  time_slot_id: string;
  time_formatted: string;
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

export type { SalesOrdersResponse };
