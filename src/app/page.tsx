"use client";
import CategoryGrid from "@/components/CategoryGrid";
import Features from "@/components/Features";
import Layout from "@/components/Layout";
import ProductGrid from "@/components/ProductGrid";
import React from "react";

const dealsOfTheDay = [
  {
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/a57a37934ddb3926e5f352f073486cb2732a16d153d9811df6bc10dcbbb51c44?apiKey=9810db3822b54ab583e896edd833d595&&apiKey=9810db3822b54ab583e896edd833d595",
    title: "Nat Fresh Chicken",
    price: "50.00",
    originalPrice: "80.00",
    discount: "40%",
    unit: "Piece",
  },
  {
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/64f41721-fa30-4bc0-9891-965361b4ad9d?apiKey=9810db3822b54ab583e896edd833d595&&apiKey=9810db3822b54ab583e896edd833d595",
    title: "Goat Meat Whole (Smoke)",
    price: "50.00",
    originalPrice: "80.00",
    discount: "40%",
    unit: "Piece",
  },
  {
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/edde4eab-a9cd-4485-b269-f95c0091df89?apiKey=9810db3822b54ab583e896edd833d595&&apiKey=9810db3822b54ab583e896edd833d595",
    title: "Tomato Premium Import",
    price: "50.00",
    originalPrice: "80.00",
    discount: "40%",
    unit: "Piece",
  },
];

const categories = [
  {
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/4b5d49eb55014a505b0159eebbc9b1fd60d7b1e72aaa14896c1bb64464c26973?apiKey=9810db3822b54ab583e896edd833d595&&apiKey=9810db3822b54ab583e896edd833d595",
    title: "Meat",
  },
  {
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/6b4d735ddfca6fb17bab455ec20b459176a8a19fd116b34966fd6a00386eb55e?apiKey=9810db3822b54ab583e896edd833d595&&apiKey=9810db3822b54ab583e896edd833d595",
    title: "Indian",
  },
  {
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/3a777523e093f25882bac9ba4186e2315e007c95d353b81234c423ebde14db2e?apiKey=9810db3822b54ab583e896edd833d595&&apiKey=9810db3822b54ab583e896edd833d595",
    title: "Fresh Vegetables",
  },
  {
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/74ea6f97-6f91-42f1-8818-f921d4509c12?apiKey=9810db3822b54ab583e896edd833d595&&apiKey=9810db3822b54ab583e896edd833d595",
    title: "Juice",
  },
  {
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/c2818ef1-e63a-4251-980a-ae08a2dfcd4b?apiKey=9810db3822b54ab583e896edd833d595&&apiKey=9810db3822b54ab583e896edd833d595",
    title: "Spices",
  },
  {
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/87e5d1e7-f29d-40fc-b534-1ab444c4caf6?apiKey=9810db3822b54ab583e896edd833d595&&apiKey=9810db3822b54ab583e896edd833d595",
    title: "Fresh Fruits",
  },
  {
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/1053ffa72cce2f0413f82b0fedfaed3a0faad6f46cf873414695673369cf8696?apiKey=9810db3822b54ab583e896edd833d595&&apiKey=9810db3822b54ab583e896edd833d595",
    title: "Local Products",
  },
  {
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/caf8d92002c3882d966b83ad99a2e8c3e1b7a9a79e43c88b1cdaf8c0e1462b97?apiKey=9810db3822b54ab583e896edd833d595&&apiKey=9810db3822b54ab583e896edd833d595",
    title: "View All Categories",
  },
];

const HomePage: React.FC = () => {
  return (
    <Layout>
      <Features />
      <ProductGrid title="Deals Of the Day" products={dealsOfTheDay} />
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/c4d9fb01ef31e244549d8f7342a8e7425622a4196a9957584283252c7de0ec03?apiKey=9810db3822b54ab583e896edd833d595&&apiKey=9810db3822b54ab583e896edd833d595"
        alt=""
        className="self-center ml-80 w-2.5 aspect-square"
      />
      <CategoryGrid categories={categories} />
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/e2baf6ba19fdc9ced77f49e7e99cf4bd42088c668e4ffde3de96c04a7e972d3d?apiKey=9810db3822b54ab583e896edd833d595&&apiKey=9810db3822b54ab583e896edd833d595"
        alt="Banner"
        className="self-stretch mt-14 w-full rounded-none aspect-[3.57] max-md:mt-10 max-md:max-w-full"
      />
      <section className="flex flex-col items-center px-16 pt-20 pb-12 mt-8 w-full bg-red-400 bg-opacity-10 max-md:px-5 max-md:max-w-full">
        <h2 className="self-center text-4xl font-bold text-neutral-800 max-md:max-w-full">
          Browse All Meat Category
        </h2>
        <p className="self-center mt-3.5 text-xl text-zinc-500 text-center">
          Browse All Meat Category and shop <br /> then check if you want to
          subscribe
        </p>
        {/* Add meat category browsing component here */}
      </section>
      <ProductGrid title="Recommended For You" products={dealsOfTheDay} />
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/6ecfde43-bd9d-45f2-8017-367747755883?apiKey=9810db3822b54ab583e896edd833d595&&apiKey=9810db3822b54ab583e896edd833d595"
        alt="Banner"
        className="mt-10 w-full rounded-md aspect-[3.33] max-md:max-w-full"
      />
      <section className="flex flex-col items-center px-16 pt-16 pb-11 mt-7 w-full bg-slate-100 max-md:px-5 max-md:max-w-full">
        <h2 className="text-4xl font-bold text-neutral-800 max-md:max-w-full">
          Subscribe Your Products
        </h2>
        <p className="mt-6 text-xl text-zinc-500 text-center">
          Browse All Meat Category and shop <br /> then check if you want to
          subscribe
        </p>
        <h3 className="mt-9 text-4xl font-bold text-neutral-800">
          How does it works
        </h3>
        {/* Add subscription process explanation component here */}
      </section>
    </Layout>
  );
};

export default HomePage;
