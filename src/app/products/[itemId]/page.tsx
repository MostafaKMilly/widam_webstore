import React from "react";
import Link from "next/link";
import { ChevronRightIcon } from "lucide-react";
import ProductDetails from "@/components/products/FreshArabicAwasiLamb/ProductDetails";
import getWebsiteItem from "@/lib/queries/getWebsiteItem";

const Breadcrumbs = () => {
  return (
    <nav className="text-sm text-gray-700 my-4" aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center space-x-2">
        <li>
          <Link
            href="/"
            className="text-[#0055bb] text-lg font-normal  capitalize hover:underline"
          >
            Home
          </Link>
        </li>
        <li>
          <ChevronRightIcon className="w-4 h-4 text-slate-400" />
        </li>
        <li>
          <Link
            href="/categories"
            className="text-[#0055bb] text-lg font-normal  capitalize hover:underline"
          >
            <span className="capitalize">A</span>
            <span>All Category</span>
          </Link>
        </li>
        <li>
          <ChevronRightIcon className="w-4 h-4 text-slate-400" />
        </li>
        <li>
          <Link
            href="/categories/meat"
            className="text-[#0055bb] text-lg font-normal  capitalize hover:underline"
          >
            Meat
          </Link>
        </li>
        <li>
          <ChevronRightIcon className="w-4 h-4 text-slate-400" />
        </li>
        <li className="text-[#0055bb] text-lg font-normal  capitalize">
          Lamb Meat
        </li>
      </ol>
    </nav>
  );
};

async function ProductDetailsPage({ params }: { params: { itemId: string } }) {
  const itemId = params.itemId;
  const data = await getWebsiteItem(itemId);
  const websiteItem = data?.data;

  return (
    <div className="p-4 md:px-16 max-w-[1680px] mx-auto px-4">
      <Breadcrumbs />
      <ProductDetails websiteItem={websiteItem} />
    </div>
  );
}

export default ProductDetailsPage;
