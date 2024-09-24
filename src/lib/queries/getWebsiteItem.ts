"use server";

interface WebsiteItemResponse {
  status_code: number;
  error: number;
  message: string;
  data: WebsiteItem;
}

async function getWebsiteItem(website_item_id: string) {
  const url = `${process.env.API_BASE_URL}/api/method/widam_delivery.website_item.website_items?website_item_id=${website_item_id}&get_attribute_variants=1`;

  const requestOptions: RequestInit = {
    method: "GET",
    redirect: "follow",
  };

  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result: WebsiteItemResponse = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching website item details:", error);
  }
}

export type WebsiteItem = {
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
  price_modifier_title: any;
  is_express_item: number;
  is_pickup_item: number;
  is_mubadara_item: number;
  is_udhiya_item: number;
  is_price_modifier: number;
  default_variant: number;
  website_template_id: string;
  tags: Array<{
    id: string;
    title: string;
    icon: string;
    product_label: number;
    color: any;
  }>;
  additional_images: Array<{
    image: string;
  }>;
  website_specifications: Array<any>;
  website_item_attributes: Array<{
    attribute_id: string;
    attribute_title: string;
    attribute_style: string;
    attribute_value: {
      value_id: string;
      value_title: string;
    };
  }>;
  price: {
    website_item_price: number;
    discount_title: any;
    discount_percent: number;
    discount_amount: number;
    discounted_price: number;
    currency: string;
  };
  in_stock: number;
  product_options: Array<any>;
  attribute_variants: Array<{
    attribute_id: string;
    attribute_title: string;
    attribute_style: string;
    attribute_value: Array<{
      value_id: string;
      value_title: string;
      website_item_id: string;
      icon: string;
      in_stock: number;
    }>;
  }>;
};

export default getWebsiteItem;
