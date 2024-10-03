"use server";

import { getAuthToken } from "../helpers/getAuthToken";

interface GetSubscriptionsResponse {
  status_code: number;
  error: number;
  message: string;
  data: Subscription[];
}

interface Subscription {
  subscription_id: string;
  subscription_title: string;
  // Add other subscription fields as needed
}

interface CreateSubscriptionResponse {
  status_code: number;
  error: number;
  message: string;
  data: {
    subscription_id: string;
    // Add other fields as needed
  };
}

interface GetSubscriptionsRequest {
  subscription_id?: string;
}

interface CreateSubscriptionRequest {
  subscription_title: string;
  subscription_start_date: string;
  subscription_end_date: string;
  interval: string;
  interval_count: string;
  time_slot: string;
  address_id: string;
  subscription_items: string; // JSON string
  delivery_method?: string;
}

const API_BASE_URL = process.env.API_BASE_URL;

// Get Subscriptions
async function getSubscriptions(
  requestData?: GetSubscriptionsRequest
): Promise<GetSubscriptionsResponse | undefined> {
  const url = new URL(
    `${API_BASE_URL}/api/method/widam_delivery.subscription.get_subscriptions`
  );
  if (requestData?.subscription_id) {
    url.searchParams.append("subscription_id", requestData.subscription_id);
  }

  const requestOptions: RequestInit = {
    method: "GET",
    headers: {
      Authorization: `token ${getAuthToken()}`,
    },
    redirect: "follow",
  };

  try {
    const response = await fetch(url.toString(), requestOptions);
    const result: GetSubscriptionsResponse = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
  }
}

// Create Subscription
async function createSubscription(
  requestData: CreateSubscriptionRequest
): Promise<CreateSubscriptionResponse | undefined> {
  const url = `${API_BASE_URL}/api/method/widam_delivery.subscription.subscriptions`;

  const formData = new URLSearchParams();
  formData.append("subscription_title", requestData.subscription_title);
  formData.append(
    "subscription_start_date",
    requestData.subscription_start_date
  );
  formData.append("subscription_end_date", requestData.subscription_end_date);
  formData.append("interval", requestData.interval);
  formData.append("interval_count", requestData.interval_count);
  formData.append("time_slot", requestData.time_slot);
  formData.append("address_id", requestData.address_id);
  formData.append("subscription_items", requestData.subscription_items);
  if (requestData.delivery_method) {
    formData.append("delivery_method", requestData.delivery_method);
  }

  const requestOptions: RequestInit = {
    method: "POST",
    headers: {
      "Accept-Language": "en",
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `token ${getAuthToken()}`,
    },
    body: formData.toString(),
    redirect: "follow",
  };

  try {
    const response = await fetch(url, requestOptions);
    const result: CreateSubscriptionResponse = await response.json();
    return result;
  } catch (error) {
    console.error("Error creating subscription:", error);
  }
}

export { getSubscriptions, createSubscription };

export type {
  GetSubscriptionsResponse,
  Subscription,
  CreateSubscriptionResponse,
  GetSubscriptionsRequest,
  CreateSubscriptionRequest,
};
