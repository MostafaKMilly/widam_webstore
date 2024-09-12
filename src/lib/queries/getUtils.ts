"use server";

import { getGefenceId } from "../helpers/getGeofenceId";

interface UtilitiesResponse {
  status_code: number;
  error: number;
  message: string;
  data: Utils;
}

async function getUtils() {
  const geofence_id = await getGefenceId();
  const url = `${process.env.API_BASE_URL}/api/method/widam_delivery.utility.utilities?geofence_id=${geofence_id}`;

  const requestOptions: RequestInit = {
    method: "GET",
    redirect: "follow",
  };

  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result: UtilitiesResponse = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching utilities:", error);
  }
}

export type Utils = {
  geofence: {
    geofence_id: string;
    geofence_name: string;
  };
  delivery_date: {
    date: string;
    date_formatted: string;
  };
  time_slot: {
    time_slot_id: string;
    time_formatted: string;
  };
  home_layout: string;
  featured_layout: string;
  mandatory_to_update: number;
  android_api_version: string;
  ios_api_version: string;
  app_update_message: string;
  minimum_order_amount: number;
  address: string | null;
  wallet_balance: number;
};

export default getUtils;
