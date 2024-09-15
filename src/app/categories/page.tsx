// CategoriesPage.tsx

"use client";
import React, { useState, useEffect, useRef, Suspense } from "react";
import Header from "@/components/categories/Header";
import ProductList from "@/components/categories/ProductList";
import Sidebar from "@/components/categories/Sidebar";
import getItemGroups, {
  ItemGroupsResponse,
  WebsiteItem,
  SubCategory,
} from "@/lib/queries/getItemGroups";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

interface SortOption {
  id: number;
  label: string;
  sort_by: string;
  sort_order: "asc" | "desc";
}

function CategoriesPage({
  searchParams,
}: {
  searchParams: Record<string, any>;
}) {
  const category = searchParams.category || "All Item Groups";

  const [activeTab, setActiveTab] = useState<string>(
    category === "All Item Groups" ? "" : category
  );
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [itemGroupId, setItemGroupId] = useState<string>(category);
  const prevCategoryRef = useRef<string>(category);

  const [selectedSortOption, setSelectedSortOption] = useState<SortOption>({
    id: 1,
    label: "Price High to Low",
    sort_by: "website_item_price",
    sort_order: "desc",
  });

  const fetchItems = ({ pageParam = 1 }): Promise<ItemGroupsResponse> => {
    const { sort_by, sort_order } = selectedSortOption;
    return getItemGroups({
      item_group_id:
        activeTab || (category === "All Item Groups" ? "" : category),
      page_no: pageParam,
      limit: 10,
      sort_by,
      sort_order,
    });
  };

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isSuccess,
  } = useInfiniteQuery<ItemGroupsResponse, Error>({
    queryKey: ["items", category, activeTab, selectedSortOption],
    queryFn: ({ pageParam }) => fetchItems({ pageParam: pageParam as number }),
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage.pagination.current_page;
      const totalPages = lastPage.pagination.total_pages;
      if (currentPage < totalPages) {
        return currentPage + 1;
      } else {
        return undefined;
      }
    },
    initialPageParam: 1,
  });

  useEffect(() => {
    if (isSuccess) {
      const firstPage = data.pages[0];

      if (prevCategoryRef.current !== category) {
        setSubCategories(firstPage.data.sub_categories || []);
        setItemGroupId(firstPage.data.item_group_id || "All Item Groups");

        setActiveTab(category === "All Item Groups" ? "" : category);

        prevCategoryRef.current = category;
      }
    }
  }, [category, data?.pages, isSuccess]);

  const mergedData = data?.pages.reduce(
    (acc, page) => {
      acc.website_items.push(...page.data.website_items);
      return acc;
    },
    { website_items: [] as WebsiteItem[] }
  );

  const website_items = mergedData?.website_items || [];

  return (
    <main className="flex overflow-hidden flex-col items-center pt-8 px-20 max-md:px-5 max-md:py-24">
      <div className="flex flex-col w-full max-w-[1680px] max-md:max-w-full">
        <Header
          sub_categories={subCategories}
          item_group_id={itemGroupId}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          selectedSortOption={selectedSortOption}
          setSelectedSortOption={setSelectedSortOption}
        />
        <div className="max-w-full">
          <div className="flex gap-5 max-md:flex-col">
            <div className="flex flex-col w-[174px] max-md:ml-0 max-md:w-full">
              <Suspense>
                <Sidebar resetActiveTab={() => setActiveTab("")} />
              </Suspense>
            </div>
            <ProductList
              website_items={website_items}
              fetchNextPage={fetchNextPage}
              hasNextPage={!!hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
              isLoading={isLoading}
              isError={isError}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default CategoriesPage;
