// /lib/store/cartStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  id: string;
  name: string;
  quantity: number;
  price: number; // Ensure price is a number
  image: string;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  decrementItem: (id: string) => void;
  clearCart: () => void;
  getTotalCount: () => number;
  getTotalPrice: () => number; // New method
}

const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id);
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }
          return { items: [...state.items, item] };
        }),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      decrementItem: (id) =>
        set((state) => {
          const existingItem = state.items.find((i) => i.id === id);
          if (existingItem) {
            if (existingItem.quantity === 1) {
              return {
                items: state.items.filter((item) => item.id !== id),
              };
            } else {
              return {
                items: state.items.map((i) =>
                  i.id === id ? { ...i, quantity: i.quantity - 1 } : i
                ),
              };
            }
          }
          return state;
        }),
      clearCart: () => set({ items: [] }),
      getTotalCount: () =>
        get().items.reduce((total, item) => total + item.quantity, 0),
      getTotalPrice: () =>
        get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ), // Calculates total price
    }),
    {
      name: "cart-storage", // unique name for localStorage key
    }
  )
);

export default useCartStore;
