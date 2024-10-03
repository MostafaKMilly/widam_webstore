// src/api/walletTransactions.ts

"use server";

import { getAuthToken } from "../helpers/getAuthToken";

// src/types/walletTransaction.type.ts

export interface WalletTransaction {
  transaction_id: string;
  amount: number;
  type: "credit" | "debit";
  date: string; // ISO 8601 format
  description: string;
  balance_after: number;
  // Add other relevant fields based on your API response
}

export interface WalletTransactionsData {
  transactions: WalletTransaction[];
  total: number;
  page_no: number;
  limit: number;
}

export interface WalletTransactionsResponse {
  status_code: number;
  error: number;
  message: string;
  data: WalletTransactionsData;
}

export interface GetWalletTransactionsRequest {
  page_no?: number;
  limit?: number;
}

/**
 * Fetches wallet transactions from the API.
 *
 * @param requestData - Optional parameters for pagination.
 * @returns A promise that resolves to the wallet transactions response or undefined if an error occurs.
 */
async function getWalletTransactions(
  requestData: GetWalletTransactionsRequest = { page_no: 1, limit: 20 }
): Promise<WalletTransactionsResponse | undefined> {
  const { page_no = 1, limit = 20 } = requestData;

  // Construct the URL with query parameters
  const url = new URL(
    `${process.env.API_BASE_URL}/api/method/widam_delivery.wallet_transaction.wallet_transactions`
  );
  url.searchParams.append("page_no", String(page_no));
  url.searchParams.append("limit", String(limit));

  // Retrieve the authentication token
  const token = getAuthToken();

  // Define the request headers
  const headers: HeadersInit = {
    "Accept-Language": "ar", // Set to "ar" as per the Postman collection
    "Content-Type": "application/json", // Assuming JSON; adjust if different
  };

  // Include the Authorization header if the token is available
  if (token) {
    headers["Authorization"] = `token ${token}`;
  }

  // Define the request options
  const requestOptions: RequestInit = {
    method: "GET",
    headers,
    redirect: "follow",
  };

  try {
    const response = await fetch(url.toString(), requestOptions);

    // Check if the response status is OK (200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse the JSON response
    const result: WalletTransactionsResponse = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching wallet transactions:", error);
    return undefined;
  }
}

export default getWalletTransactions;
