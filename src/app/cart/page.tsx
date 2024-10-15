// components/cart/CartPage.tsx
"use client";

import React, { useState } from "react";
import useCartStore from "@/lib/store/cartStore";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { ShoppingCart, AlertCircle } from "lucide-react"; // Importing Lucide Icons
import { useDictionary } from "@/lib/hooks/useDictionary";
import CartItem from "@/components/cart/cartItem";
import AddressSelectionDialog from "@/components/cart/AddressSelectionDialog";

const CartPage: React.FC = () => {
  const { dictionary } = useDictionary(); // Localization
  const cartItems = useCartStore((state) => state.items);
  const totalPrice = useCartStore((state) => state.getTotalPrice());
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const router = useRouter();

  const openAddressDialog = () => setIsAddressDialogOpen(true);
  const closeAddressDialog = () => setIsAddressDialogOpen(false);

  const handleContinue = () => {
    if (cartItems.length === 0) {
      toast.error(dictionary.cartEmpty || "Your cart is empty!");
      return;
    }
    openAddressDialog();
  };

  const handlePlaceOrder = async (address: any) => {
    setIsPlacingOrder(true);
    try {
      // Prepare the order data
      const quotationIdResponse = await fetch("/api/cart/getQuotationId", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // Populate with necessary data
          split: "example_split",
          pickup: address.address, // Example
          website_items: JSON.stringify(cartItems),
          qid_field_placeholder: "placeholder",
        }),
      });

      if (!quotationIdResponse.ok) {
        throw new Error(
          dictionary.orderPlacementFailed || "Failed to get quotation ID"
        );
      }

      const quotationData = await quotationIdResponse.json();

      if (quotationData.status_code !== 200) {
        throw new Error(
          quotationData.message || "Quotation ID retrieval failed"
        );
      }

      const quotationId = quotationData.data.quotation_id;

      // Place the order
      const placeOrderResponse = await fetch("/api/cart/placeOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quotation_id: quotationId,
          payment_method: "credit_card", // Example
          _lang: "en",
        }),
      });

      if (!placeOrderResponse.ok) {
        throw new Error(
          dictionary.orderPlacementFailed || "Failed to place order"
        );
      }

      const orderData = await placeOrderResponse.json();

      if (orderData.status_code !== 200) {
        throw new Error(orderData.message || "Order placement failed");
      }

      toast.success(
        dictionary.orderPlacedSuccessfully || "Order placed successfully!"
      );
      useCartStore.getState().clearCart();
      router.push(`/order/${orderData.data.order_id}`);
    } catch (error: any) {
      console.error("Error placing order:", error);
      toast.error(
        error.message ||
          dictionary.orderPlacementError ||
          "An error occurred while placing the order."
      );
    } finally {
      setIsPlacingOrder(false);
      closeAddressDialog();
    }
  };

  return (
    <div className="container mx-auto p-6 mt-6">
      <div className="flex items-center mb-6">
        <ShoppingCart className="w-8 h-8 text-blue-600" />
        <h1 className="text-3xl font-bold ml-2">
          {dictionary.yourCart || "Your Cart"}
        </h1>
      </div>
      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64">
          <AlertCircle className="w-16 h-16 text-gray-400" />
          <p className="text-xl text-gray-500 mt-4">
            {dictionary.cartEmpty || "Your cart is empty."}
          </p>
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="divide-y">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <div className="p-6 flex justify-between items-center bg-gray-50">
            <span className="text-2xl font-semibold">
              {dictionary.total || "Total"}: {`QAR ${totalPrice.toFixed(2)}`}
            </span>
            <button
              onClick={handleContinue}
              className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <span className="mr-2">{dictionary.continue || "Continue"}</span>
              <ShoppingCart className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Address Selection Dialog */}
      <AddressSelectionDialog
        isOpen={isAddressDialogOpen}
        onClose={closeAddressDialog}
        onSelectAddress={handlePlaceOrder}
      />

      {/* Optionally, you can show a loading indicator when placing an order */}
      {isPlacingOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg">
            <p className="text-lg">Placing your order...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
