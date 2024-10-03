"use server";

import { cookies } from "next/headers";
import { User } from "../types/user.type";

interface UpdateUserResponse {
  status_code: number;
  error: number;
  message: string;
  data: User;
  _server_messages: string;
}

interface GetUserResponse {
  status_code: number;
  error: number;
  message: string;
  data: User;
}

interface UpdateLanguageResponse {
  status_code: number;
  error: number;
  message: string;
  data: {
    language: string;
  };
}

interface UpdateUserRequest {
  salutation?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  nationality?: string;
  file?: File;
}

interface UpdateLanguageRequest {
  language: string; // 'en' or 'ar'
}

async function updateUser(
  requestData: UpdateUserRequest
): Promise<UpdateUserResponse | undefined> {
  const url = `${process.env.API_BASE_URL}/api/method/widam_delivery.user.users`;

  const formData = new FormData();
  if (requestData.salutation)
    formData.append("salutation", requestData.salutation);
  if (requestData.first_name)
    formData.append("first_name", requestData.first_name);
  if (requestData.last_name)
    formData.append("last_name", requestData.last_name);
  if (requestData.email) formData.append("email", requestData.email);
  if (requestData.nationality)
    formData.append("nationality", requestData.nationality);
  if (requestData.file) formData.append("file", requestData.file);

  const requestOptions: RequestInit = {
    method: "PUT",
    headers: {
      "Accept-Language": "ar", // As per your request
      Authorization: `token ${getTokenFromCookies()}`,
    },
    body: formData,
    redirect: "follow",
  };

  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result: UpdateUserResponse = await response.json();
    // Optionally, update cookies if needed
    return result;
  } catch (error) {
    console.error("Error updating user profile:", error);
  }
}

async function getUser(
  defaultToken?: string
): Promise<GetUserResponse | undefined> {
  const url = `${process.env.API_BASE_URL}/api/method/widam_delivery.user.users`;

  const token = defaultToken || getTokenFromCookies();

  const requestOptions: RequestInit = {
    method: "GET",
    headers: {
      "Accept-Language": "en",
      Authorization: `token ${token}`,
    },
  };

  try {
    const response = await fetch(url, requestOptions);

    console.log(response , "user")
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result: GetUserResponse = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching user profile:", error);
  }
}

async function updateUserLanguage(
  requestData: UpdateLanguageRequest
): Promise<UpdateLanguageResponse | undefined> {
  const url = `${process.env.API_BASE_URL}/api/method/widam_delivery.user.user_language`;

  const formData = new URLSearchParams();
  formData.append("language", requestData.language);

  const requestOptions: RequestInit = {
    method: "PUT",
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
    const result: UpdateLanguageResponse = await response.json();
    return result;
  } catch (error) {
    console.error("Error updating user language:", error);
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

export { updateUser, getUser, updateUserLanguage };

export type {
  UpdateUserResponse,
  GetUserResponse,
  UpdateLanguageResponse,
  UpdateUserRequest,
  UpdateLanguageRequest,
};
