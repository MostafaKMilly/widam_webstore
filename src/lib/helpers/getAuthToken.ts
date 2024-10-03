"use server";

import { cookies } from "next/headers";

export const getAuthToken = (): string | undefined => {
  const cookiesStore = cookies();
  return cookiesStore.get("token")?.value;
};
