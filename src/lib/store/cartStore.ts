// cartStore.ts

import { create } from "zustand";
import { persist } from "zustand/middleware";
import useUserStore from "./userStore";
import {
  deleteQuotation,
  getQuotationDetails,
  updateQuotation,
} from "../api/cart";
import { WebsiteItem } from "../queries/getWebsiteItem";

interface CartState {
  items: WebsiteItem[];
  addItem: (item: WebsiteItem, quantity?: number) => Promise<void>;
  removeItem: (website_item_id: string) => Promise<void>;
  decrementItem: (website_item_id: string) => Promise<void>;
  setItemQuantity: (website_item_id: string, quantity: number) => Promise<void>;
  clearCart: (quotation_id: string) => Promise<void>;
  getTotalCount: () => number;
  getTotalPrice: () => number;
  loadCart: (items: WebsiteItem[]) => void;
}

const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: async (item: WebsiteItem, quantity: number = 1) => {
        const user = useUserStore.getState().user;
        if (!user) {
          throw new Error("User is not authenticated");
        }

        set((state) => {
          const existingItem = state.items.find(
            (i) => i.website_item_id === item.website_item_id
          );
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.website_item_id === item.website_item_id
                  ? { ...i, qty_in_cart: (i.qty_in_cart || 0) + quantity }
                  : i
              ),
            };
          }
          return {
            items: [...state.items, { ...item, qty_in_cart: quantity }],
          };
        });

        try {
          const websiteItems = JSON.stringify(
            mapCartItemsToWebsiteItems(get().items)
          );
          await updateQuotation({ website_items: websiteItems });
        } catch (error) {
          console.error("Error adding item to backend cart:", error);
        }
      },
      removeItem: async (website_item_id: string) => {
        const user = useUserStore.getState().user;
        if (!user) {
          throw new Error("User is not authenticated");
        }

        set((state) => ({
          items: state.items.filter(
            (item) => item.website_item_id !== website_item_id
          ),
        }));

        try {
          const websiteItems = JSON.stringify(
            mapCartItemsToWebsiteItems(get().items)
          );
          await updateQuotation({ website_items: websiteItems });
        } catch (error) {
          console.error("Error removing item from backend cart:", error);
        }
      },
      decrementItem: async (website_item_id: string) => {
        const user = useUserStore.getState().user;
        if (!user) {
          throw new Error("User is not authenticated");
        }

        set((state) => {
          const existingItem = state.items.find(
            (i) => i.website_item_id === website_item_id
          );
          if (existingItem) {
            if ((existingItem.qty_in_cart || 0) <= 1) {
              return {
                items: state.items.filter(
                  (item) => item.website_item_id !== website_item_id
                ),
              };
            } else {
              return {
                items: state.items.map((i) =>
                  i.website_item_id === website_item_id
                    ? {
                        ...i,
                        qty_in_cart: (i.qty_in_cart || 1) - 1,
                      }
                    : i
                ),
              };
            }
          }
          return state;
        });

        try {
          const websiteItems = JSON.stringify(
            mapCartItemsToWebsiteItems(get().items)
          );
          await updateQuotation({ website_items: websiteItems });
        } catch (error) {
          console.error("Error decrementing item in backend cart:", error);
        }
      },
      setItemQuantity: async (website_item_id: string, quantity: number) => {
        const user = useUserStore.getState().user;
        if (!user) {
          throw new Error("User is not authenticated");
        }

        set((state) => {
          if (quantity <= 0) {
            return {
              items: state.items.filter(
                (item) => item.website_item_id !== website_item_id
              ),
            };
          } else {
            return {
              items: state.items.map((i) =>
                i.website_item_id === website_item_id
                  ? { ...i, qty_in_cart: quantity }
                  : i
              ),
            };
          }
        });

        try {
          const websiteItems = JSON.stringify(
            mapCartItemsToWebsiteItems(get().items)
          );
          await updateQuotation({ website_items: websiteItems });
        } catch (error) {
          console.error("Error setting item quantity in backend cart:", error);
        }
      },
      clearCart: async (quotation_id: string) => {
        // Updated
        const user = useUserStore.getState().user;
        if (!user) {
          throw new Error("User is not authenticated");
        }

        set({ items: [] });

        try {
          await deleteQuotation({ quotation_id });
        } catch (error) {
          console.error("Error clearing backend cart:", error);
        }
      },
      getTotalCount: () =>
        get().items.reduce((total, item) => total + (item.qty_in_cart || 0), 0),
      getTotalPrice: () =>
        get().items.reduce((total, item) => {
          const price =
            item.price.discounted_price > 0
              ? item.price.discounted_price
              : item.price.website_item_price;
          return total + price * (item.qty_in_cart || 0);
        }, 0),
      loadCart: (items: WebsiteItem[]) => {
        set({ items });
      },
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({ items: state.items }),
    }
  )
);

function mapCartItemsToWebsiteItems(cartItems: WebsiteItem[]): any[] {
  return cartItems.map((item) => ({
    website_item_id: item.website_item_id,
    quantity: (item.qty_in_cart || 0).toString(),
    time_slot: "",
    delivery_date: "",
    product_options: item.product_options || [],
  }));
}

export default useCartStore;
