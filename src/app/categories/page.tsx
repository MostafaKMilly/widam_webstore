import Header from "@/components/categories/Header";
import ProductList from "@/components/categories/ProductList";
import Sidebar from "@/components/categories/Sidebar";
import React from "react";

function CategoriesPage() {
  return (
    <main className="flex overflow-hidden flex-col items-center pt-8 px-20 max-md:px-5 max-md:py-24">
      <div className="flex flex-col w-full max-w-[1680px] max-md:max-w-full">
        <Header />
        <div className="max-w-full w-[904px]">
          <div className="flex gap-5 max-md:flex-col">
            <div className="flex flex-col w-[174px] max-md:ml-0 max-md:w-full">
              <Sidebar />
            </div>
            <ProductList />
          </div>
        </div>
      </div>
    </main>
  );
}

export default CategoriesPage;
