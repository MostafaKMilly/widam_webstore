// CheckoutPage.tsx

"use client";

import React, { useEffect, useState, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getQuotationDetails,
  updateQuotation,
  placeOrder,
  Qutation,
} from "@/lib/api/cart";
import { getPaymentMethods } from "@/lib/api/paymentMethods";
import useCartStore from "@/lib/store/cartStore";
import useUserStore from "@/lib/store/userStore";
import getUtils from "@/lib/queries/getUtils";
import PaymentMethods from "@/components/layout/Footer/PaymentMethods";
import DefaultAddress from "@/components/home/address/DefaultAddress";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import AddressSelectionDialog from "@/components/cart/AddressSelectionDialog";
import PaymentMethod from "@/components/cart/PaymentMethod";
import Breadcrumbs from "@/components/Breadcrumbs";
import OrderSummary from "@/components/cart/OrderSummary";
import { getGeofenceDetails } from "@/lib/api/geofences";
import TimeSlotSelectionDialog from "@/components/cart/TimeSlotSelectionDialog";
import { LoadingComponent } from "@/components/layout/LoadingComponent";
import { ErrorComponent } from "@/components/layout/ErrorComponent";

const CheckoutPage: React.FC = () => {
  const queryClient = useQueryClient();
  const { items: cartItems, loadCart, clearCart } = useCartStore();
  const { user } = useUserStore();
  const router = useRouter();
  const [selectedPaymentOption, setSelectedPaymentOption] = useState<
    string | null
  >(null);
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);
  const [isTimeSlotDialogOpen, setIsTimeSlotDialogOpen] = useState(false);

  const [selectedDate, setSelectedDate] = useState<any>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<any>(null);

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

  const {
    data: paymentMethodsData,
    isLoading: paymentMethodsLoading,
    error: paymentMethodsError,
    isSuccess: isPaymentMethodsSuccess,
  } = useQuery({
    queryKey: ["paymentMethods"],
    queryFn: () => getPaymentMethods(),
    select: (res) => res?.data.payment_methods,
  });

  const { data: geofenceData } = useQuery({
    queryKey: ["geofenceData"],
    queryFn: () => getGeofenceDetails(),
    select: (res) => res?.data,
  });

  const subtotal = data?.data?.total || 0;
  const shippingFee =
    data?.data?.cart_content?.normal_delivery.delivery_charges || 0;
  const discount = data?.data?.total_discount_amount || 0;
  const serviceFee = 0;
  const grandTotal = data?.data?.cart_content?.normal_delivery.sub_total || 0;

  const updateQuotationMutation = useMutation({
    mutationFn: updateQuotation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error) => {
      console.error("Failed to update quotation:", error);
    },
  });

  const popupRef = useRef<Window | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    let popupInterval: any;

    console.log(isPopupOpen , popupRef)
    if (isPopupOpen && popupRef.current) {
      popupInterval = setInterval(() => {
        console.log("Popup is open" , !popupRef.current || popupRef.current.closed);
        try {
          if (!popupRef.current || popupRef.current.closed) {
            clearInterval(popupInterval);
            setIsPopupOpen(false);
            return;
          }

          const popupUrl = popupRef.current.location.href;

          console.log(popupUrl);
          if (popupUrl.includes("qpay.webhook.ipn_status")) {
            // The popup has navigated to the payment status URL
            // Now we can try to read the response
            const responseText = popupRef.current.document.body.innerText;

            const responseJson = JSON.parse(responseText);

            // Process the responseJson
            const { payment_success, message, order_id } = responseJson;

            if (payment_success === true) {
              toast.success("Payment was successfully processed.");
              // Optionally, navigate to order confirmation
              router.push(`/order-confirmation?order_id=${order_id}`);
            } else if (payment_success === false) {
              toast.error(`Payment failed: ${message}`);
            }

            // Close the popup window
            if (popupRef.current && !popupRef.current.closed) {
              popupRef.current.close();
              setIsPopupOpen(false);
            }

            // Clear the interval
            clearInterval(popupInterval);
          }
        } catch (error) {
          // The popup is on a different origin, so we cannot access its location
          console.log(error)
        }
      }, 1000);
    }

    return () => {
      clearInterval(popupInterval);
    };
  }, [isPopupOpen, router]);

  const placeOrderMutation = useMutation({
    mutationFn: placeOrder,
    onSuccess: async (res) => {
      console.log(res);
      if (res) {
        if (res.data.redirect_url) {
          // Open the redirect_url in a popup window
          const popup = window.open(
            res.data.redirect_url,
            "Payment",
            "width=600,height=700"
          );
          if (popup) {
            popupRef.current = popup;
            setIsPopupOpen(true);
          } else {
            toast.error(
              "Failed to open payment window. Please disable popup blockers and try again."
            );
          }
        } else if (res.data.order_id) {
          try {
            clearCart(data?.data.quotation_id || "");
            queryClient.invalidateQueries({ queryKey: ["cart"] });
          } catch (error) {
            console.error("Error clearing cart after order placement:", error);
            toast.error("Order placed, but failed to clear the cart.");
          }

          router.push(`/order-confirmation?order_id=${res.data.order_id}`);
        } else {
          toast.error("Unexpected response from the server.");
        }
      } else {
        toast.error("Failed to place order. Please try again.");
      }
    },
    onError: (error) => {
      console.error("Error placing order:", error);
      toast.error("An error occurred while placing the order.");
    },
  });

  useEffect(() => {
    if (isSuccess && data?.data) {
      loadCart(data.data.cart_content?.normal_delivery.website_items || []);
    }
  }, [loadCart, isSuccess, data]);

  useEffect(() => {
    if (isPaymentMethodsSuccess && paymentMethodsData?.length) {
      const sortedPaymentMethods = paymentMethodsData
        .slice()
        .filter(
          (method) =>
            method.enabled === 1 &&
            method.title !== "Google Pay" &&
            method.title !== "Apple Pay"
        )
        .sort((a, b) => a.priority - b.priority);
      setSelectedPaymentOption(sortedPaymentMethods[0].payment_method_id);

      updateQuotationMutation.mutate({
        payment_method: sortedPaymentMethods[0].payment_method_id,
      });
    }
  }, [isPaymentMethodsSuccess, paymentMethodsData]);

  useEffect(() => {
    if (geofenceData) {
      const normalDelivery = geofenceData.delivery_methods.find(
        (method) => method.type === "Normal Delivery"
      );

      if (normalDelivery) {
        const firstAvailableDate = normalDelivery.time_slot_group.dates[0];
        const firstAvailableTimeSlot = firstAvailableDate.time_slots.find(
          (ts) => ts.timeslot_overload === 0
        );
        setSelectedDate(firstAvailableDate);
        setSelectedTimeSlot(firstAvailableTimeSlot);

        if (firstAvailableDate && firstAvailableTimeSlot) {
          updateQuotationMutation.mutate({
            delivery_date: firstAvailableDate.date,
            time_slot: firstAvailableTimeSlot.time_slot_id,
          });
        }
      }
    }
  }, [geofenceData]);

  if (isLoading || utilsLoading || paymentMethodsLoading)
    return <LoadingComponent />;
  if (error || utilsError || paymentMethodsError)
    return <ErrorComponent message="Error loading checkout data." />;

  const handleChangeAddress = () => {
    setIsAddressDialogOpen(true);
  };

  const handlePlaceOrder = async () => {
    try {
      await updateQuotationMutation.mutateAsync({
        payment_method: selectedPaymentOption!,
        delivery_date: selectedDate?.date,
        time_slot: selectedTimeSlot?.time_slot_id,
      });

      await placeOrderMutation.mutateAsync({
        payment_method: selectedPaymentOption!,
        quotation_id: data?.data?.quotation_id!,
        create_token: "0",
        _lang: "en",
      });
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("An error occurred while placing the order.");
    }
  };

  const paymentOptions = paymentMethodsData
    ?.filter(
      (method) =>
        method.enabled === 1 &&
        method.title !== "Google Pay" &&
        method.title !== "Apple Pay"
    )
    .sort((a, b) => a.priority - b.priority);

  const normalDelivery = geofenceData?.delivery_methods.find(
    (method) => method.type === "Normal Delivery"
  );

  const handlePaymentMethodChange = (paymentMethodId: string) => {
    setSelectedPaymentOption(paymentMethodId);

    updateQuotationMutation.mutate({ payment_method: paymentMethodId });
  };

  const handleTimeSlotChange = (date: any, timeSlot: any) => {
    setSelectedDate(date);
    setSelectedTimeSlot(timeSlot);

    updateQuotationMutation.mutate({
      delivery_date: date.date,
      time_slot: timeSlot.time_slot_id,
    });
  };

  return (
    <div className="container mx-auto p-4 mt-6 mb-12">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Cart", href: "/cart" },
          { label: "Checkout" },
        ]}
      />

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-2/3">
          {/* Address Section */}
          <div className="bg-white p-6 rounded border border-[#BEBEBE] mb-6 ">
            <div className="flex justify-between items-center mb-4 px-3">
              <h2 className="text-[#232323] text-[20px] font-semibold">
                Ship To
              </h2>

              <button
                onClick={handleChangeAddress}
                className="text-[#ef3e42] text-[20px] font-semibold text-xl"
              >
                Change
              </button>
            </div>

            {user?.preferred_shipping_address ? (
              <DefaultAddress
                address={user.preferred_shipping_address}
                className="shadow-none! border-none! py-0"
                styles={{
                  border: "none",
                  boxShadow: "none",
                }}
              />
            ) : (
              <p>No shipping address selected.</p>
            )}
          </div>

          {/* Payment Method Section */}
          <PaymentMethod
            onOptionSelect={handlePaymentMethodChange}
            selectedOption={selectedPaymentOption}
            paymentOptions={paymentOptions || []}
          />

          {/* Order Review Section */}
          <div className="bg-white py-6 px-10 mt-8 rounded  mb-6 border border-[#BEBEBE]">
            <h2 className="text-[20px] font-semibold  mb-4">Order Review</h2>

            <div
              className="p-4 border border-spacing-0.5 border-[#CCC] rounded-sm bg-white mb-6 "
              style={{ borderWidth: "0.5" }}
            >
              <div className="flex items-center mb-6 gap-4">
                <img src="/icons/delivery-icon copy.svg" alt="Delivery Icon" />

                <h3 className="text-2xl text-[20px] font-semibold">
                  Scheduled Delivery
                </h3>
              </div>

              {/* Cart Items */}
              <div className="flex space-x-4 overflow-x-auto py-4">
                {cartItems.map((item) => (
                  <div
                    key={item.website_item_id}
                    className="relative border border-[#CCC]"
                    style={{ borderWidth: "0.5 !important" }}
                  >
                    <img
                      src={item.website_item_image}
                      alt={item.website_item_name}
                      className="w-36 h-36 object-cover rounded-sm"
                    />
                    <div className="absolute -top-4 -right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold">
                      {item.qty_in_cart}
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery Slot Section */}
              <div className="mt-6 flex items-center gap-4 ">
                <h4 className="text-lg font-semibold mb-2">Delivery Slot:</h4>
                <div className="flex items-center gap-4 max-w-[440px] w-full border border-[#ECEAF0] justify-between p-2 rounded-sm bg-[#F7F6FA]">
                  <span className="text-xs font-bold text-neutral-800">
                    {selectedDate ? selectedDate.date_formatted : ""},{" "}
                    {selectedTimeSlot ? selectedTimeSlot.time_formatted : ""}
                  </span>
                  <div className="flex justify-center w-[150px] items-center px-4 h-10 bg-white rounded-sm borde">
                    <button
                      onClick={() => setIsTimeSlotDialogOpen(true)}
                      className="text-red-500 font-semibold text-sm"
                    >
                      Change Slot
                    </button>
                  </div>
                </div>
              </div>

              {/* Delivery Cost Section */}
              <div className="mt-6 flex gap-4 items-center">
                <h4 className="text-lg font-semibold mb-2">Delivery Cost:</h4>
                <div className="text-[#232323] text-lg font-semibold">
                  QAR {shippingFee.toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-1/3">
          <OrderSummary
            cartTotal={subtotal}
            shippingFee={shippingFee}
            discount={discount}
            serviceFee={serviceFee}
            grandTotal={grandTotal}
            onPlaceOrder={handlePlaceOrder}
            loading={placeOrderMutation.isPending || isPopupOpen}
          />
        </div>
      </div>

      {/* Address Selection Dialog */}
      <AddressSelectionDialog
        isOpen={isAddressDialogOpen}
        onClose={() => setIsAddressDialogOpen(false)}
      />

      {/* Time Slot Selection Dialog */}
      {normalDelivery && (
        <TimeSlotSelectionDialog
          isOpen={isTimeSlotDialogOpen}
          onClose={() => setIsTimeSlotDialogOpen(false)}
          onTimeSlotSelect={handleTimeSlotChange}
          normalDelivery={normalDelivery}
        />
      )}
    </div>
  );
};

export default CheckoutPage;
