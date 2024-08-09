"use server";

interface ValidateCoordinatesResponse {
  status_code: number;
  error: number;
  message: string;
  data: {
    latitude?: string;
    longitude?: string;
    isValid?: boolean;
    matchedGeofence?: {
      geofence_id: string;
      geofence_name: string;
    };
    delivery_center?: {
      delivery_center_id: string;
      delivery_center_title: string;
      warehouse_id: string;
      warehouse_name: string | null;
    };
    default_address: {
      latitude: string;
      longitude: string;
      city: {
        city_id: string;
        city_name: string;
      };
      geofence: {
        geofence_id: string;
        geofence_name: string;
      };
    };
  };
}

export async function validateCord(
  latitude?: number,
  longitude?: number
): Promise<ValidateCoordinatesResponse | void> {
  const baseUrl = `${process.env.API_BASE_URL}/api/method/widam_delivery.api.validate_coordinates`;
  const url = new URL(baseUrl);

  if (latitude !== undefined && longitude !== undefined) {
    url.searchParams.append("latitude", latitude.toString());
    url.searchParams.append("longitude", longitude.toString());
  }

  try {
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result: ValidateCoordinatesResponse = await response.json();

    return result;
  } catch (error) {
    console.error("Error fetching or validating coordinates:", error);
  }
}
