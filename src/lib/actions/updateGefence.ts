"use server";
import { cookies } from "next/headers";

export const updateGefence = (gefenceId: string) => {
  const cookiesStore = cookies();

  cookiesStore.set("geofence_id", gefenceId);
};
