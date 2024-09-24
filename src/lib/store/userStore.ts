// stores/useUserStore.ts

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "../types/user.type";

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: User) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "user-storage", // unique name for localStorage key
      getStorage: () => localStorage, // (optional) by default, 'localStorage' is used
      // Optionally, you can whitelist or blacklist certain fields
      // whitelist: ["user"],
      // blacklist: [],
    }
  )
);

export default useUserStore;
