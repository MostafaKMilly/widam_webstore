"use server";

import { cookies } from "next/headers";

interface ValidateQidResponse {
  status_code: number;
  error: number;
  message: string;
  data: {
    is_valid: boolean;
    // Add other relevant fields
  };
}

interface ValidateQidRequest {
  mubadara_id: string;
  qid: string;
  quantity: string;
}

async function validateQid(
  requestData: ValidateQidRequest
): Promise<ValidateQidResponse | undefined> {
  const url = `${process.env.API_BASE_URL}/api/method/widam_delivery.validate.validate_qid`;

  const formData = new URLSearchParams();
  formData.append("mubadara_id", requestData.mubadara_id);
  formData.append("qid", requestData.qid);
  formData.append("quantity", requestData.quantity);

  const requestOptions: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `token ${getTokenFromCookies()}`,
    },
    body: formData.toString(),
    redirect: "follow",
  };

  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result: ValidateQidResponse = await response.json();
    return result;
  } catch (error) {
    console.error("Error validating QID:", error);
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

export { validateQid };

export type { ValidateQidResponse, ValidateQidRequest };
