"use client";
import React, { useEffect, useRef } from "react";
import ProductCard from "./ProductCard";
import { WebsiteItem } from "@/lib/queries/getItemGroups";
import { Loader } from "lucide-react";

interface ProductListProps {
  website_items: WebsiteItem[];
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  isLoading: boolean;
  isError: boolean;
}

const ProductList: React.FC<ProductListProps> = ({
  website_items,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isLoading,
  isError,
}) => {
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center mx-auto h-64">
        <Loader className="animate-spin w-10 h-10 text-gray-500" />
      </div>
    );
  if (isError) return <div>Error loading products.</div>;

  return (
    <section className="flex flex-col ml-5 w-4/5 max-md:ml-0 max-md:w-full pb-4">
      <div className="flex flex-col mt-9 w-full max-md:mt-10 max-md:max-w-full max-md:mt-4">
        <div className="max-md:max-w-full">
          <div className="grid grid-cols-4 gap-5 max-md:grid-cols-1">
            {website_items?.map((item) => (
              <div key={item.website_item_id} className="flex">
                <ProductCard item={item} />
              </div>
            ))}
          </div>
        </div>
        {hasNextPage && (
          <div ref={observerRef} className="h-10 mt-4 flex justify-center items-center">
            {isFetchingNextPage && (
              <div className="flex justify-center items-center">
                <Loader className="animate-spin w-8 h-8 text-primary" />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductList;
