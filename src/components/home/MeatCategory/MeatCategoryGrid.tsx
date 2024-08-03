import React from "react";
import MeatCategoryItem from "./MeatCategoryItem";

interface MeatCategory {
  name: string;
  imageSrc: string;
  imageClass: string;
}

const meatCategories: MeatCategory[] = [
  {
    name: "camel meat",
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/494f2717af1aa6407b009662907c5dbb678698e20cb954783fe2022ec2a15511?apiKey=9810db3822b54ab583e896edd833d595&&apiKey=9810db3822b54ab583e896edd833d595",
    imageClass:
      "object-contain bg-red-400 aspect-[1.01] h-[159px] rounded-[121px] shadow-[0px_0px_2px_rgba(0,0,0,0.161)] w-[159px]",
  },
  {
    name: "Beef Meat",
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/28313ea3-f9c6-4b86-b97c-fc7f7a717a85?apiKey=9810db3822b54ab583e896edd833d595&&apiKey=9810db3822b54ab583e896edd833d595",
    imageClass:
      "object-contain bg-red-400 aspect-[1.01] h-[159px] rounded-[121px] shadow-[0px_0px_2px_rgba(0,0,0,0.161)] w-[159px]",
  },
  {
    name: "Lamb meat",
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/645b50d2bc0016b883f305b1b486b70ffcdb56400cf0d3a07cfbaad77b2a5573?apiKey=9810db3822b54ab583e896edd833d595&&apiKey=9810db3822b54ab583e896edd833d595",
    imageClass:
      "object-contain bg-red-400 aspect-[1.01] h-[159px] rounded-[121px] shadow-[0px_0px_2px_rgba(0,0,0,0.161)] w-[159px]",
  },
  {
    name: "chicken",
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/d7f015fa4886caa9b694ab317a78b1b2fc3a7ec6fe04aa2dc6ad1bbac91ce7fa?apiKey=9810db3822b54ab583e896edd833d595&&apiKey=9810db3822b54ab583e896edd833d595",
    imageClass:
      "object-contain bg-red-400 aspect-[1.01] h-[159px] rounded-[121px] shadow-[0px_0px_2px_rgba(0,0,0,0.161)] w-[159px]",
  },
  {
    name: "camel meat",
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/3e976963c6cafe5e2fcdfede59719de7e5051b4d63f060ff052316aea6f08b48?apiKey=9810db3822b54ab583e896edd833d595&&apiKey=9810db3822b54ab583e896edd833d595",
    imageClass:
      "object-contain bg-red-400 aspect-[1.01] h-[159px] rounded-[121px] shadow-[0px_0px_2px_rgba(0,0,0,0.161)] w-[159px]",
  },
  {
    name: "Beef Meat",
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/494f2717af1aa6407b009662907c5dbb678698e20cb954783fe2022ec2a15511?apiKey=9810db3822b54ab583e896edd833d595&&apiKey=9810db3822b54ab583e896edd833d595",
    imageClass:
      "object-contain bg-red-400 aspect-[1.01] h-[159px] rounded-[121px] shadow-[0px_0px_2px_rgba(0,0,0,0.161)] w-[159px]",
  },
  {
    name: "Lamb meat",
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/b6719e04-bbdf-4a78-893d-c1809813196b?apiKey=9810db3822b54ab583e896edd833d595&&apiKey=9810db3822b54ab583e896edd833d595",
    imageClass:
      "object-contain bg-red-400 aspect-[1.01] h-[159px] rounded-[121px] shadow-[0px_0px_2px_rgba(0,0,0,0.161)] w-[159px]",
  },
  {
    name: "Aqeeqah",
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/8ff75c4c95aa142872d650c0b105d2a13f9097466d57c3f526103e2153a44581?apiKey=9810db3822b54ab583e896edd833d595&&apiKey=9810db3822b54ab583e896edd833d595",
    imageClass:
      "object-contain bg-red-400 aspect-[1.01] h-[159px] rounded-[121px] shadow-[0px_0px_2px_rgba(0,0,0,0.161)] w-[159px]",
  },
];

const MeatCategoryGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-2 gap-5 mt-9 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8">
      {meatCategories.map((category, index) => (
        <MeatCategoryItem key={index} {...category} />
      ))}
    </div>
  );
};

export default MeatCategoryGrid;
