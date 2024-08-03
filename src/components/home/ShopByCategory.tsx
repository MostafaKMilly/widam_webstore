import React from "react";
import CategoryCard from "./CategoryCard";

interface Category {
  imageSrc: string;
  title: string;
  altText: string;
  imageClassName?: string;
}

const categories: Category[] = [
  {
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/4b5d49eb55014a505b0159eebbc9b1fd60d7b1e72aaa14896c1bb64464c26973?apiKey=9810db3822b54ab583e896edd833d595&&apiKey=9810db3822b54ab583e896edd833d595",
    title: "Meat",
    altText: "Meat category",
  },
  {
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/6b4d735ddfca6fb17bab455ec20b459176a8a19fd116b34966fd6a00386eb55e?apiKey=9810db3822b54ab583e896edd833d595&&apiKey=9810db3822b54ab583e896edd833d595",
    title: "Indian",
    altText: "Indian category",
  },
  {
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/3a777523e093f25882bac9ba4186e2315e007c95d353b81234c423ebde14db2e?apiKey=9810db3822b54ab583e896edd833d595&&apiKey=9810db3822b54ab583e896edd833d595",
    title: "Fresh\nVegetables",
    altText: "Fresh Vegetables category",
  },
  {
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/a39cb3c1-2329-4959-be29-bba9c3a7477f?apiKey=9810db3822b54ab583e896edd833d595&&apiKey=9810db3822b54ab583e896edd833d595",
    title: "Juice",
    altText: "Juice category",
  },
  {
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/b482e7c3-4886-44c1-80cf-c1ba47ac7254?apiKey=9810db3822b54ab583e896edd833d595&&apiKey=9810db3822b54ab583e896edd833d595",
    title: "Spices",
    altText: "Spices category",
  },
  {
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/a5f6680e-dd98-479f-a29f-1c6f2da9495c?apiKey=9810db3822b54ab583e896edd833d595&&apiKey=9810db3822b54ab583e896edd833d595",
    title: "Fresh Fruits",
    altText: "Fresh Fruits category",
  },
  {
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/1053ffa72cce2f0413f82b0fedfaed3a0faad6f46cf873414695673369cf8696?apiKey=9810db3822b54ab583e896edd833d595&&apiKey=9810db3822b54ab583e896edd833d595",
    title: "Local\nProducts",
    altText: "Local Products category",
  },
  {
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/caf8d92002c3882d966b83ad99a2e8c3e1b7a9a79e43c88b1cdaf8c0e1462b97?apiKey=9810db3822b54ab583e896edd833d595&&apiKey=9810db3822b54ab583e896edd833d595",
    title: "View All\nCategories",
    altText: "View All Categories",
    imageClassName: "w-[60px] mt-[37px]",
  },
];

const ShopByCategory: React.FC = () => {
  return (
    <section className="flex flex-col items-center sm:flex-row sm:justify-between sm:items-start rounded-none">
      <div className="flex flex-col self-start">
        <h2 className="text-4xl font-bold text-sky-800 max-md:mr-2.5">
          Shop by category
        </h2>
        <div className="flex flex-wrap gap-8 mt-4">
          {categories.map((category, index) => (
            <CategoryCard
              key={index}
              imageSrc={category.imageSrc}
              title={category.title}
              altText={category.altText}
              imageClassName={category.imageClassName}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopByCategory;
