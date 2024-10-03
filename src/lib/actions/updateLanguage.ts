"use server";
import { cookies } from "next/headers";

export const updateLanguage = async (language: "en" | "ar") => {
  const cookiesStore = cookies();

  cookiesStore.set("language", language);
};
