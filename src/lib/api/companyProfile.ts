"use server";

import { getAuthToken } from "../helpers/getAuthToken";

interface CompanyProfileResponse {
  status_code: number;
  error: number;
  message: string;
  data: CompanyProfile;
}

interface CompanyProfile {
  company_name: string;
  address: string;
  // Add other company profile fields as needed
}

const API_BASE_URL = process.env.API_BASE_URL;

// Get Company Profile
async function getCompanyProfile(): Promise<
  CompanyProfileResponse | undefined
> {
  const url = `${API_BASE_URL}/api/method/widam_delivery.company_profile.details`;

  const requestOptions: RequestInit = {
    method: "GET",
    headers: {
      "Accept-Language": "en",
      Authorization: `token ${getAuthToken()}`,
    },
    redirect: "follow",
  };

  try {
    const response = await fetch(url, requestOptions);
    const result: CompanyProfileResponse = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching company profile:", error);
  }
}

export { getCompanyProfile };

export type { CompanyProfileResponse, CompanyProfile };
