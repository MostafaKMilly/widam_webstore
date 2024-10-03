"use server";

interface ValidateCoordinatesResponse {
  status_code: number;
  error: number;
  message: string;
  data: boolean; // Assuming validation returns a boolean
}

async function validateCoordinates(
  latitude: string,
  longitude: string
): Promise<ValidateCoordinatesResponse | undefined> {
  const url = `${
    process.env.API_BASE_URL
  }/api/method/widam_delivery.api.validate_coordinates?latitude=${encodeURIComponent(
    latitude
  )}&longitude=${encodeURIComponent(longitude)}`;

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
    const result: ValidateCoordinatesResponse = await response.json();
    return result;
  } catch (error) {
    console.error("Error validating coordinates:", error);
  }
}

export { validateCoordinates };

export type { ValidateCoordinatesResponse };
