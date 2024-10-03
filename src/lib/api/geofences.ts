"use server";

interface GeofencesResponse {
  status_code: number;
  error: number;
  message: string;
  data: Geofence[];
}

interface Geofence {
  geofence_id: string;
  geofence_name: string;
  // Add other relevant fields
}

async function getGeofences(
  geofence_id: string
): Promise<GeofencesResponse | undefined> {
  const url = `${
    process.env.API_BASE_URL
  }/api/method/widam_delivery.geofence.geofences?geofence_id=${encodeURIComponent(
    geofence_id
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

export { getGeofences };

export type { GeofencesResponse, Geofence };
