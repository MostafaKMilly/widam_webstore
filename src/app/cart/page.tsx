"use client";

import React, { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getQuotationDetails,
  updateQuotation,
  QuotationIdResponse,
  Qutation,
} from "@/lib/api/cart";
import useCartStore from "@/lib/store/cartStore";
import useUserStore from "@/lib/store/userStore";
import getUtils from "@/lib/queries/getUtils";
import { useDictionary } from "@/lib/hooks/useDictionary";
import PaymentMethods from "@/components/layout/Footer/PaymentMethods";
import toast from "react-hot-toast";
import AddressSelectionDialog from "@/components/cart/AddressSelectionDialog";
import { useRouter } from "next/navigation";
import { LoadingComponent } from "@/components/layout/LoadingComponent";
import { ErrorComponent } from "@/components/layout/ErrorComponent";
import CartItemComponent from "@/components/cart/CartItemComponent";
import { applyCouponToCart, getCouponCodes } from "@/lib/api/couponCodes";

interface Coupon {
  title: string;
  description: string;
  code: string;
}

const Coupons: React.FC = () => {
  const [couponCode, setCouponCode] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["couponCodes"],
    queryFn: () => getCouponCodes(),
  });

  const coupons: Coupon[] = data?.data
    ? data.data.map((couponCode) => ({
        title: couponCode.description, // Adjust if you have a title field
        description: couponCode.description,
        code: couponCode.coupon_code_id,
      }))
    : [];

  const handleApplyCoupon = async (code: string) => {
    try {
      await applyCouponToCart(code);
      toast.success(`Coupon ${code} applied!`);
    } catch (error) {
      toast.error(`Failed to apply coupon ${code}.`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleApplyCoupon(couponCode);
    setCouponCode("");
  };

  if (isLoading) return <div>Loading coupons...</div>;
  if (error) return <div>Error loading coupons.</div>;

  return (
    <div className="bg-gray-100 p-6 rounded shadow mb-6 bg-[#F6F6F6]">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center bg-white rounded-sm border border-stone-300 px-3.5 py-3">
          <input
            type="text"
            id="couponInput"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="flex-grow border-none outline-none text-gray-700"
            placeholder="ENTER COUPON CODE"
            aria-label="Enter coupon code"
          />
          <button type="submit" className="font-bold text-blue-500 ml-2">
            APPLY
          </button>
        </div>
      </form>

      {coupons.length > 0 ? (
        coupons.map((coupon, index) => (
          <article
            key={index}
            className="flex flex-col px-3.5 pt-5 pb-px mt-6 w-full text-black bg-white rounded-sm border-solid shadow-sm border-[0.5px] border-zinc-100"
          >
            <h2 className="self-start font-bold">
              <span className="capitalize">Get</span> {coupon.title}
            </h2>
            <p className="self-start mt-3.5 text-base font-medium">
              {coupon.description}
            </p>
            <div className="flex flex-wrap gap-5 justify-between mt-8 text-sky-800 whitespace-nowrap">
              <div className="px-8 py-3 font-medium rounded-sm border border-blue-500 border-dashed bg-neutral-100">
                {coupon.code}
              </div>
              <button
                onClick={() => handleApplyCoupon(coupon.code)}
                className="my-auto font-bold"
              >
                Apply
              </button>
            </div>
            <hr className="shrink-0 mt-5 max-w-full bg-white border-white w-full" />
          </article>
        ))
      ) : (
        <div className="mt-4 text-gray-500 text-center">
          No coupons available at this time.
        </div>
      )}
    </div>
  );
};

const CartPage: React.FC = () => {
  const {
    items: cartItems,
    addItem,
    decrementItem,
    removeItem,
    getTotalPrice,
    loadCart,
  } = useCartStore();

  const { dictionary } = useDictionary();

  const { data, isLoading, error, isSuccess } = useQuery({
    queryKey: ["cart"],
    queryFn: () => getQuotationDetails(),
    select: (res) =>
      res?.message === "Cart Empty" ? { data: {} as Partial<Qutation> } : res,
  });

  const {
    data: utilsData,
    isLoading: utilsLoading,
    error: utilsError,
  } = useQuery({
    queryKey: ["utils"],
    queryFn: () => getUtils(),
  });

  const subtotal = getTotalPrice();

  useEffect(() => {
    if (isSuccess && data?.data && data.data.cart_content) {
      loadCart(data?.data.cart_content.normal_delivery.website_items);
    }
  }, [loadCart, isSuccess, data]);

  const dict = dictionary;
  const dateFormatted = utilsData?.data.delivery_date.date_formatted;
  let convertedDate = "";

  if (dateFormatted) {
    const dayOfMonth = dateFormatted.split(",")[1]?.trim().split(" ")[0];
    if (dayOfMonth) {
      const currentDay = new Date().getDate();
      if (parseInt(dayOfMonth) > currentDay) {
        convertedDate = `TOM ${dayOfMonth}`;
      } else {
        convertedDate = `TOD ${dayOfMonth}`;
      }
    }
  }

  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);

  const user = useUserStore((state) => state.user);

  const queryClient = useQueryClient();

  const router = useRouter();

  const updateQuotationMutation = useMutation<
    QuotationIdResponse | undefined,
    Error,
    { shipping_address_id: string }
  >({
    mutationFn: (variables) =>
      updateQuotation({ shipping_address_id: variables.shipping_address_id }),
    onSuccess: (data) => {
      console.log("Quotation updated successfully:", data);
      toast.success("Quotation updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      router.push("/checkout");
    },
    onError: (error) => {
      console.error("Error updating quotation:", error);
      toast.error("Failed to update quotation. Please try again.");
    },
  });

  const handleCheckout = () => {
    if (!data?.data?.shipping_address_id) {
      setIsAddressDialogOpen(true);
    } else {
      updateQuotationMutation.mutate({
        shipping_address_id: user?.preferred_shipping_address?.address_id!,
      });
    }
  };

  const handleAddressSelected = (addressId: string) => {
    updateQuotationMutation.mutate({
      shipping_address_id: addressId,
    });
  };

  if (isLoading || utilsLoading) return <LoadingComponent />;
  if (error || utilsError)
    return <ErrorComponent message="Error loading cart data." />;

  return (
    <div className="container mx-auto p-4 mt-6 mb-12">
      {cartItems.length === 0 ? (
        // **Empty Cart Message and Continue Shopping Button**
        <div className="flex flex-col items-center justify-center h-full py-20">
          <h2 className="text-3xl font-semibold mb-4">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-6">
            Looks like you haven&apos;t added anything to your cart yet.
          </p>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-3 bg-primary text-white rounded transition"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-2/3">
            <div className="flex gap-4 text-blue-600 mb-4">
              <a href="/" className="hover:underline">
                Home
              </a>
              <span>/</span>
              <span>Cart</span>
            </div>

            <h2 className="text-3xl font-semibold mt-8 mb-12">
              Your Cart Details
            </h2>

            <div className="flex flex-col relative gap-4 bg-[#F4FBFB] p-4 border border-[#BEBEBE] shadow-sm">
              <div className="w-full h-16 flex items-center justify-between gap-4 mb-6">
                <div className="text-[#232323] text-[24px] font-semibold">
                  Scheduled Delivery
                </div>

                <div className="flex gap-4 items-center">
                  <span className="text-[#232323] text-md font-bold tracking-wide">
                    {dict.earlies_delivery}
                  </span>
                  <img
                    src="/icons/delivery-icon copy.svg"
                    alt="Delivery Icon"
                  />
                  <div className="w-[250px] h-16 bg-[#F7F6FA] rounded-sm border border-[#ECEAF0] flex items-center px-2">
                    <div className="flex gap-2.5 items-center font-bold leading-5">
                      <div className="flex w-fit px-1 h-[36.782px] bg-[#F7F6FA] rounded-sm items-center gap-1">
                        <div className="w-[34px] h-[33px] bg-white rounded-sm p-6 flex items-center justify-center">
                          <p className="text-[#ef3e42] text-xs text-center">
                            {convertedDate}
                          </p>
                        </div>
                        <div className="text-[#232323] text-[12px] font-bold">
                          {utilsData?.data.time_slot.time_formatted}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-red-500 text-white absolute -top-6 px-4 py-2 rounded mb-4">
                {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
              </div>
              {cartItems.map((item) => (
                <CartItemComponent key={item.website_item_id} item={item} />
              ))}

              <div className="flex justify-between text-xl font-semibold mt-6">
                <span>Sub Total</span>

                <span className="text-[#888888] font-medium">
                  {subtotal.toFixed(2)} QAR
                </span>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/3">
            <Coupons />

            <div className="bg-gray-100 p-6 rounded shadow mb-6 bg-[#F8FBFF]">
              <div className="flex justify-between text-xl font-semibold">
                <div>
                  <span className="text-[#444444] text-[18px] font-bold capitalize">
                    Order Total
                  </span>
                  <span className="text-[#444444] text-[18px] font-medium capitalize">
                    {" ( "}
                  </span>

                  <span className="text-[#aaaaaa] text-[16px] font-medium capitalize">
                    {cartItems.length}{" "}
                    {cartItems.length === 1 ? " item" : " items"}
                  </span>
                  <span className="text-[#444444] text-[18px] font-medium capitalize">
                    {" )"}
                  </span>
                </div>
                <div>
                  <span className="text-[#232323] text-[16px] font-bold capitalize">
                    {subtotal.toFixed(2)}
                  </span>
                  <span className="text-[#232323] text-[16px] font-bold capitalize">
                    {" "}
                  </span>
                  <span className="text-[#232323] text-base font-medium capitalize">
                    QAR
                  </span>
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={handleCheckout}
                  disabled={updateQuotationMutation.isPending}
                  className={`mx-auto self-center mt-12 w-[280px] text-white py-3 rounded ${
                    updateQuotationMutation.isPending
                      ? "bg-slate-400 cursor-not-allowed"
                      : "bg-[#0050b3]"
                  }`}
                >
                  {updateQuotationMutation.isPending
                    ? "Processing..."
                    : "Checkout"}
                </button>
              </div>
            </div>

            <h3 className="text-xl text-center font-semibold mt-8 mb-4">
              Available Payment Methods
            </h3>
            <div className="flex items-center justify-center gap-4">
              <PaymentMethods />
            </div>
          </div>
        </div>
      )}

      <AddressSelectionDialog
        isOpen={isAddressDialogOpen}
        onClose={() => setIsAddressDialogOpen(false)}
        onAddressSelected={handleAddressSelected}
      />
    </div>
  );
};

export default CartPage;
