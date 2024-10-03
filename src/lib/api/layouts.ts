"use server";

import { cookies } from "next/headers";

interface LayoutsResponse {
  status_code: number;
  error: number;
  message: string;
  data: Layout[];
}

interface Layout {
  layout_id: string;
  name: string;
  // Add other relevant fields
}

async function getLayouts(
  layout_id: string,
  sort_by: string,
  sort_order: string
): Promise<LayoutsResponse | undefined> {
  const url = `${
    process.env.API_BASE_URL
  }/api/method/widam_delivery.layout.layouts?layout_id=${encodeURIComponent(
    layout_id
  )}&sort_by=${encodeURIComponent(sort_by)}&sort_order=${encodeURIComponent(
    sort_order
  )}`;

  const requestOptions: RequestInit = {
    method: "GET",
    headers: {
      "Accept-Language": "en",
      Authorization: `token ${getTokenFromCookies()}`,
    },
    redirect: "follow",
  };

  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result: LayoutsResponse = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching layouts:", error);
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

export { getLayouts };

export type { LayoutsResponse, Layout };
