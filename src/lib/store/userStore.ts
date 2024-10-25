// stores/useUserStore.ts

import { create } from "zustand";
import { persist } from "zustand/middleware";
import useCartStore from "./cartStore";
import { Address } from "../api/addresses";

type CustomerDetails = {
  customer_name: string;
  salutation: string;
  nationality: string;
};

type ProfileDetails = {
  first_name: string;
  last_name: string;
  customer_details: CustomerDetails;
};

type User = {
  token: string;
  user_id: string;
  user_name: string;
  email: string;
  mobile_no: string;
  profile_details: ProfileDetails;
  preferred_shipping_address?: Address | null; // Add preferred_shipping_address
};

interface UserState {
  user: User | null;
  language: string; // Add language state
  setUser: (user: User) => void;
  clearUser: () => void;
  setLanguage: (language: string) => void; // Method to set language
}

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      language: "en", // Default language
      setUser: async (user: User) => {
        set({ user });
      },
      clearUser: () => set({ user: null }),
      setLanguage: (language: string) => set({ language }), // Implement setLanguage
    }),
    {
      name: "user-storage", // unique name for localStorage key
      getStorage: () => localStorage, // (optional) by default, 'localStorage' is used
      // Optionally, you can whitelist or blacklist certain fields
      // whitelist: ["user", "language"],
      // blacklist: [],
    }
  )
);

export default useUserStore;
