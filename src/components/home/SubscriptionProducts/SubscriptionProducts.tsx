/**
 * This code was generated by Builder.io.
 */
import React from "react";
import ProductCard from "./ProductCard";
import HowItWorks from "./HowItWorks";

const products = [
  {
    id: 1,
    name: "Tomato Premium Import",
    price: 50.0,
    originalPrice: 80.0,
    discount: "40% OFF",
    unit: "Piece",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/b5786d60-1adc-41ff-8051-8414cfe5b11e?apiKey=9810db3822b54ab583e896edd833d595&&apiKey=9810db3822b54ab583e896edd833d595",
  },
  {
    id: 2,
    name: "Tomato Premium Import",
    price: 50.0,
    originalPrice: 80.0,
    discount: "40% OFF",
    unit: "Piece",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/f0a0c4f0f1f4e1e7aeeef59839798dfbae8e7b13bbbea47545d3501e1198e20b?apiKey=9810db3822b54ab583e896edd833d595&&apiKey=9810db3822b54ab583e896edd833d595",
  },
  {
    id: 3,
    name: "Goat Meat Whole (Smoke)",
    price: 50.0,
    originalPrice: 80.0,
    discount: "40% OFF",
    unit: "Piece",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/64121daf-5bbc-4f4d-92ad-882814ad94bf?apiKey=9810db3822b54ab583e896edd833d595&&apiKey=9810db3822b54ab583e896edd833d595",
  },
  {
    id: 4,
    name: "Nat Chicken",
    price: 50.0,
    originalPrice: 80.0,
    discount: "40% OFF",
    unit: "Piece",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/1e97f9eb2d06e17fdaf1f6c4989589e600c48d59702be5253ced47c32b598625?apiKey=9810db3822b54ab583e896edd833d595&&apiKey=9810db3822b54ab583e896edd833d595",
  },
  {
    id: 5,
    name: "Tomato Premium Import",
    price: 50.0,
    originalPrice: 80.0,
    discount: "40% OFF",
    unit: "Piece",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/a08eb1b5-c383-47ad-a8fa-e0bae78c5296?apiKey=9810db3822b54ab583e896edd833d595&&apiKey=9810db3822b54ab583e896edd833d595",
  },
];

const SubscriptionProducts: React.FC = () => {
  return (
    <main className="flex flex-col rounded-none">
      <section className="flex flex-col justify-center items-center px-20 py-14 w-full bg-slate-100 max-md:px-5 max-md:max-w-full">
        <div className="flex flex-col w-full max-w-[1652px] max-md:max-w-full">
          <div className="self-center ml-5 max-w-full w-[1251px]">
            <div className="flex gap-5 max-md:flex-col">
              <div className="flex flex-col w-[84%] max-md:ml-0 max-md:w-full">
                <div className="flex flex-col items-center w-full max-md:mt-6 max-md:max-w-full">
                  <h1 className="ml-24 text-4xl font-bold text-neutral-800 max-md:max-w-full">
                    Subscribe Your Products
                  </h1>
                  <p className="mt-3 ml-24 text-xl text-zinc-500">
                    Browse All Meat Category and shop <br />
                    then check if you want to subscribe
                  </p>
                  <h2 className="mt-7 ml-24 text-4xl font-bold text-neutral-800">
                    How does it works
                  </h2>
                  <HowItWorks />
                </div>
              </div>
              <div className="flex flex-col ml-5 w-[16%] max-md:ml-0 max-md:w-full">
                <div className="flex flex-col grow mt-64 text-lg text-sky-800 whitespace-nowrap max-md:mt-10">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/9e36e92c635127159304ecac8d70a3b2749dde195edcff4e1b96d67cec720491?apiKey=9810db3822b54ab583e896edd833d595&&apiKey=9810db3822b54ab583e896edd833d595"
                    alt=""
                    className="object-contain rounded-none aspect-square w-[201px]"
                  />
                  <div className="self-start px-2 py-2 mt-2.5 ml-8 rounded-full shadow-[0px_3px_3px_rgba(0,0,0,0.161)] max-md:ml-2.5">
                    03
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-5 self-center mt-14 ml-7 max-w-full text-4xl font-bold text-sky-500 w-[605px] items-center max-md:mt-10">
            <div className="flex-auto max-md:max-w-full">
              <span className="text-sky-500">Go To Subs</span>cription Products
            </div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/15df5cb1168e4437d48c27a2dee2d0083ffbe58d7906a26ecd1ecc19190ea3bc?apiKey=9810db3822b54ab583e896edd833d595&&apiKey=9810db3822b54ab583e896edd833d595"
              alt=""
              className="object-contain shrink-0 self-start mt-2 aspect-[1.34] w-[43px]"
            />
          </div>
          <h2 className="self-start mt-16 text-4xl font-bold text-sky-800 max-md:mt-10 max-md:max-w-full">
            Recommended For You
          </h2>
          <div className="flex flex-wrap gap-5 mt-8 max-md:max-w-full">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default SubscriptionProducts;