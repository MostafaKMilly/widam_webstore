"use server";

import { cookies } from "next/headers";

interface CitiesResponse {
  status_code: number;
  error: number;
  message: string;
  data: City[];
}

interface City {
  city_id: string;
  name: string;
  // Add other relevant fields
}

async function getCities(
  geofence_id: string
): Promise<CitiesResponse | undefined> {
  const url = `${
    process.env.API_BASE_URL
  }/api/method/widam_delivery.city.cities?geofence_id=${encodeURIComponent(
    geofence_id
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
    const result: CitiesResponse = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching cities:", error);
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

export { getCities };

export type { CitiesResponse, City };
