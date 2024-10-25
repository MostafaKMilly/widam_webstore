"use server";

import { getGeofenceId } from "../helpers/getGeofenceId";

interface GeofencesResponse {
  status_code: number;
  error: number;
  message: string;
  data: Geofence;
}

interface Geofence {
  geofence_id: string;
  geofence_name: string;
  delivery_methods: Array<{
    delivery_method_id: string;
    type: string;
    delivery_method_title: string;
    icon?: string;
    description?: string;
    delivery_charges: number;
    minimum_order_amount: number;
    time_slot_group: {
      time_slot_group_id: string;
      max_sales_order: number;
      dates: Array<{
        date: string;
        date_formatted: string;
        time_slots: Array<{
          time_slot_id: string;
          from_time: string;
          to_time: string;
          maximum_orders: number;
          time_formatted: string;
          timeslot_overload: number;
        }>;
      }>;
    };
  }>;
}

async function getGeofenceDetails(): Promise<GeofencesResponse | undefined> {
  const geofencieId = await getGeofenceId();
  const url = `${
    process.env.API_BASE_URL
  }/api/method/widam_delivery.geofence.geofences?geofence_id=${encodeURIComponent(
    geofencieId || ""
  )}`;

  const requestOptions: RequestInit = {
    method: "GET",
    headers: {
      "Accept-Language": "en",
    },
    redirect: "follow",
  };

  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result: GeofencesResponse = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching geofences:", error);
  }
}

export { getGeofenceDetails };

export type { GeofencesResponse, Geofence };
