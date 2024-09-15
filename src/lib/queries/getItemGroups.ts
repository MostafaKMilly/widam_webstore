"use server";

import { getGefenceId } from "../helpers/getGeofenceId";

interface GetItemGroupsParams {
  item_group_id?: string;
  website_item_name?: string;
  subscription_item_group?: number;
  sort_by?: string;
  sort_order?: "asc" | "desc";
  page_no?: number;
  barcode?: string;
  lang?: string;
  min_price?: number;
  max_price?: number;
  limit?: number;
}

export interface ItemGroupsResponse {
  status_code: number;
  error: number;
  message: string;
  pagination: Pagination;
  data: ItemGroupData;
}

interface Pagination {
  current_page: number;
  items_per_page: number;
  total_items: number;
  total_pages: number;
}

interface ItemGroupData {
  item_group_id: string;
  item_group_name: string;
  item_group_image: string | null;
  is_group: number;
  sub_categories: SubCategory[];
  website_items: WebsiteItem[];
}

export interface SubCategory {
  item_group_id: string;
  item_group_name: string;
  item_group_image: string | null;
  is_group: number;
}

export interface WebsiteItem {
  website_item_id: string;
  website_item_name: string;
  stock_uom: string;
  has_website_variant: number;
  website_item_image: string;
  item_group: string;
  is_express_item: number;
  is_requires_preparation: number;
  website_item_short_name: string;
  website_item_type: string;
  min_qty: number;
  max_qty: number;
  price: Price;
  has_product_options: number;
  in_stock: number;
  tags: Tag[];
}

interface Price {
  website_item_price: number;
  discount_title: string | null;
  discount_percent: number;
  discount_amount: number;
  discounted_price: number;
  currency: string;
}

interface Tag {
  id: string;
  title: string;
  icon: string | null;
  product_label: number;
  color: string | null;
}

async function getItemGroups(
  params: GetItemGroupsParams
): Promise<ItemGroupsResponse> {
  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      queryParams.append(key, value.toString());
    }
  });

  const url = `${
    process.env.API_BASE_URL
  }/api/method/widam_delivery.item_group.item_groups?${queryParams.toString()}`;

  const requestOptions: RequestInit = {
    method: "GET",
    redirect: "follow",
  };

  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      console.log(response);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result: ItemGroupsResponse = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching item groups:", error);
    throw error;
  }
}

export default getItemGroups;
