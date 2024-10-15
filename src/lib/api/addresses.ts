"use server";

import { cookies } from "next/headers";

interface GetAddressesResponse {
  status_code: number;
  error: number;
  message: string;
  data: Address[];
}

export interface Address {
  full_name: string;
  address_id: string;
  address_title: string;
  address_type: string;
  street_no: string;
  building_no: string;
  city: {
    city_id: string;
    city_name: string;
  };
  zone: string;
  area: {
    area_id: string;
    area_name: string;
  };
  country: {
    country_id: string;
    country_name: string;
  };
  latitude: string;
  longitude: string;
  landmark: any;
  preferred_shipping_address: number;
  phone: string;
  customer_id: string;
  customer_fullname: string;
  geofence: {
    geofence_id: string;
    geofence_name: string;
  };
}

interface AddAddressResponse {
  status_code: number;
  error: number;
  message: string;
  data: Address;
}

interface UpdateAddressResponse {
  status_code: number;
  error: number;
  message: string;
  data: Address;
}

interface DeleteAddressResponse {
  status_code: number;
  error: number;
  message: string;
  data: null;
}

interface AddAddressRequest {
  address_title: string;
  address_type: string;
  street_no: string;
  building_no: string;
  city: string;
  zone: string;
  area: string;
  country: string;
  latitude: string;
  longitude: string;
  phone: string;
  email_id: string;
  is_shipping_address: string;
  full_name: string;
  landmark: string;
}

interface UpdateAddressRequest {
  address_id: string;
  address_title?: string;
  address_type?: string;
  street_no?: string;
  building_no?: string;
  city?: string;
  zone?: string;
  area?: string;
  country?: string;
  latitude?: string;
  longitude?: string;
  phone?: string;
  email_id?: string;
  is_shipping_address?: string;
  full_name?: string;
  landmark?: string;
}

interface DeleteAddressRequest {
  address_id: string;
}

async function getAddresses(): Promise<GetAddressesResponse | undefined> {
  const url = `${process.env.API_BASE_URL}/api/method/widam_delivery.address.addresses`;

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
    const result: GetAddressesResponse = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching addresses:", error);
  }
}

async function addAddress(
  requestData: AddAddressRequest
): Promise<AddAddressResponse | undefined> {
  const url = `${process.env.API_BASE_URL}/api/method/widam_delivery.address.addresses`;

  const formData = new URLSearchParams();
  Object.entries(requestData).forEach(([key, value]) => {
    formData.append(key, value);
  });

  const requestOptions: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept-Language": "en",
      Authorization: `token ${getTokenFromCookies()}`,
    },
    body: formData.toString(),
    redirect: "follow",
  };

  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      const result = await response.json();
      console.log(result);
      throw new Error(result.message);
    }
    const result: AddAddressResponse = await response.json();
    return result;
  } catch (error) {
    console.error("Error adding address:", error);
    throw error;
  }
}

async function updateAddress(
  requestData: UpdateAddressRequest
): Promise<UpdateAddressResponse | undefined> {
  const url = `${process.env.API_BASE_URL}/api/method/widam_delivery.address.addresses`;

  const formData = new URLSearchParams();
  Object.entries(requestData).forEach(([key, value]) => {
    if (value !== undefined) {
      formData.append(key, value);
    }
  });

  const requestOptions: RequestInit = {
    method: "PUT",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept-Language": "en",
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
    const result: UpdateAddressResponse = await response.json();
    return result;
  } catch (error) {
    console.error("Error updating address:", error);
  }
}

async function deleteAddress(
  requestData: DeleteAddressRequest
): Promise<DeleteAddressResponse | undefined> {
  const url = `${process.env.API_BASE_URL}/api/method/widam_delivery.address.addresses`;

  const formData = new URLSearchParams();
  formData.append("address_id", requestData.address_id);

  const requestOptions: RequestInit = {
    method: "DELETE",
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
    const result: DeleteAddressResponse = await response.json();
    return result;
  } catch (error) {
    console.error("Error deleting address:", error);
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

export { getAddresses, addAddress, updateAddress, deleteAddress };

export type {
  GetAddressesResponse,
  AddAddressResponse,
  UpdateAddressResponse,
  DeleteAddressResponse,
  AddAddressRequest,
  UpdateAddressRequest,
  DeleteAddressRequest,
};
