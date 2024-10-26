"use client";

import React from "react";
import { SalesOrder } from "@/lib/api/salesOrders";
import Image from "next/image";
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reorder } from "@/lib/api/cart";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
}

const ProductImage: React.FC<ImageProps> = ({ src, alt, className }) => (
  <img loading="lazy" src={src} alt={alt} className={className} />
);

interface OrderItemProps {
  order: SalesOrder;
}

const OrderItemComponent: React.FC<OrderItemProps> = ({ order }) => {
  // Format date and time
  const orderDate = new Date(`${order?.sales_order_date}T${order?.time}`);
  const formattedDate = orderDate.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const formattedTime = orderDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const totalAmount = order.grand_total.toFixed(2) + " " + order.currency;

  const items = order.items;

  const queryClient = useQueryClient();
  const router = useRouter();

  const reorderMutation = useMutation({
    mutationFn: () =>
      reorder({
        sales_order_id: order.sales_order_id,
      }),
    onSuccess: (data) => {
      toast.success("Order added to cart successfully!");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      router.push("/cart");
    },
    onError: (error: any) => {
      console.error("Error reordering sales order:", error);
      toast.error("Failed to reorder. Please try again.");
    },
  });

  return (
    <main className="flex flex-col rounded-none mb-6">
      <section className="flex flex-wrap gap-10 px-3.5 py-2 mt-3 w-full bg-white rounded-sm shadow-sm">
        <article className="flex-auto">
          <div className="flex gap-5 flex-col md:flex-row">
            <div className="flex flex-col w-full md:w-9/12">
              <div className="flex flex-col items-start w-full mt-1.5">
                <div className="flex gap-3.5 font-semibold whitespace-nowrap">
                  <h2 className="text-base text-neutral-400">Order</h2>
                  <p className="text-xl text-neutral-900">
                    {order.sales_order_id}
                  </p>
                </div>

                <time className="mt-2 text-base font-semibold text-neutral-400">
                  {formattedDate} . {formattedTime}
                </time>

                <div className="flex gap-3 self-stretch mt-4">
                  {items.slice(0, 3).map((item, index) => (
                    <div key={index} className="relative">
                      <ProductImage
                        src={item.image_view}
                        alt={item.website_item_name}
                        className="object-contain shrink-0 max-w-full rounded-sm aspect-square w-[114px] border border-slate-200"
                      />
                      <div className="absolute -top-3 -right-2 bg-red-500 text-white text-sm rounded-full font-semibold px-2.5 py-1">
                        {item.quantity}
                      </div>
                    </div>
                  ))}
                </div>

                <p className="mt-3 text-xl font-semibold text-neutral-900">
                  {totalAmount}
                </p>

                <div className="flex gap-1.5 mt-2.5 text-base font-semibold text-neutral-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M19.555 10.2764C19.555 15.3997 15.401 19.5527 10.2772 19.5527C5.15396 19.5527 1 15.3997 1 10.2764C1 5.15304 5.15396 1 10.2772 1C15.401 1 19.555 5.15304 19.555 10.2764Z"
                      stroke="#03ADEB"
                      stroke-width="0.5"
                    />
                    <path
                      d="M10.6415 18.1754C10.4399 18.1754 10.2764 18.0305 10.2764 17.8518V10.3735L14.2298 7.20286C14.3787 7.08312 14.6109 7.09283 14.746 7.22551C14.8811 7.35818 14.8694 7.5627 14.7205 7.68243L11.0066 10.6608V17.8518C11.0066 18.0305 10.843 18.1754 10.6415 18.1754Z"
                      fill="#03ADEB"
                    />
                  </svg>
                  <p>{order.payment_method.title}</p>
                </div>
              </div>
            </div>
          </div>
        </article>

        <div className="flex flex-col self-start whitespace-nowrap">
          <p className="self-end px-9 py-2.5 text-xl font-light  rounded-sm bg-neutral-100 text-stone-500">
            {order.status}
          </p>
          <button
            className="px-16 py-2 mt-40 text-xl font-semibold text-white bg-sky-500 rounded-sm"
            onClick={() => {
              reorderMutation.mutate();
            }}
          >
            {reorderMutation.isPending ? "Reordering..." : "Reorder"}
          </button>
        </div>
      </section>
    </main>
  );
};

export default OrderItemComponent;
