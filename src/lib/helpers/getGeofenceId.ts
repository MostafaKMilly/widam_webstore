import { cookies } from "next/headers";
import { validateCord } from "../queries/validateCord";

export const getGeofenceId = async () => {
  const cookiesStore = cookies();
  let geofencId = cookiesStore.get("geofence_id")?.value;

  if (!geofencId) {
    const data = await validateCord();
    if (data) {
      geofencId = data.data.default_address.geofence.geofence_id;
    }
  }
  return geofencId;
};
