"use server";
import { cookies } from "next/headers";
import getUtils from "./getUtils";

export const getHomeLayoutId = async () => {
  const data = await getUtils();
  const homeLayoutId = data?.data.home_layout;
  return homeLayoutId;
};

interface LayoutResponse {
  status_code: number;
  error: number;
  message: string;
  data: {
    layout_id: string;
    layout_title: string;
    published: number;
    data: Array<{
      block_id: string;
      block_type: string;
      popups: number;
      show_title: number;
      show_title_block: number;
      background: string;
      icon: string | null;
      data: Array<{
        banner_type?: string;
        banner_link?: string;
        banner_image?: string;
        udhiyah?: number;
        website_item_id?: string;
        website_item_name?: string;
        website_item_short_name?: string;
        website_item_type?: string;
        is_default_variant?: number;
        min_qty?: number;
        max_qty?: number;
        stock_uom?: string;
        has_website_variant?: number;
        website_item_image?: string;
        item_group?: string;
        is_express_item?: number;
        is_requires_preparation?: string;
        price?: {
          website_item_price: number;
          discount_title: string | null;
          discount_percent: number;
          discount_amount: number;
          discounted_price: number;
          currency: string;
        };
        has_product_options?: number;
        price_modifier_title?: string;
        is_price_modifier?: number;
        tags?: Array<string>;
        in_stock?: number;
        is_pickup?: number;
        is_mubadara?: number;
        is_udhiyah?: number;
        mubadara_id?: string;
        item_group_id?: string;
        item_group_name?: string;
        item_group_image?: string;
        parameters?: string | null;
      }>;
      is_dynamic: number;
      title?: string;
      item_group_background?: string;
      view_type?: string;
    }>;
  };
}

async function getLayout(layoutId: string) {
  const url = `${process.env.API_BASE_URL}/api/method/widam_delivery.layout.layouts?layout_id=${layoutId}`;
  const cookiesStore = cookies();
  const langauge = cookiesStore.get("language")?.value;

  const requestOptions: RequestInit = {
    method: "GET",
    redirect: "follow",
    headers: {
      "Accept-Language": langauge || "en",
    },
  };

  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result: LayoutResponse = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching layout:", error);
  }
}

export default getLayout;
