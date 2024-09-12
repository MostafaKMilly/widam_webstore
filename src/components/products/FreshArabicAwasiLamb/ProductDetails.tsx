import React from "react";
import CuttingOption from "./CuttingOption";
import LocationButton from "./LocationButton";
import QuantitySelector from "./QuantitySelector";
import AddToCartButton from "./AddToCartButton";
import { WebsiteItem } from "@/lib/queries/getWebsiteItem";

const ProductDetails = ({
  websiteItem,
}: {
  websiteItem: WebsiteItem | undefined;
}) => {
  if (!websiteItem) {
    return <div>Loading...</div>;
  }

  // Static locations for now
  const locations = [
    { name: "Al Wakra", isActive: true },
    { name: "Al Sailiya", isActive: false },
  ];

  return (
    <div className="px-20 pt-16 w-full shadow-sm bg-slate-50 max-md:px-5 max-md:pb-5 pb-10 max-md:max-w-full">
      <main className="flex flex-col lg:flex-row ">
        {/* Left Side */}
        <aside className="lg:w-1/3 flex flex-col gap-6">
          <div className="flex z-10 flex-col justify-center px-9 py-12 max-w-full text-base font-semibold text-white bg-white w-full max-md:px-5">
            <div className="flex relative flex-col items-start pb-96 min-h-[472px] max-md:pr-5 max-md:pb-24 max-md:max-w-full">
              <img
                loading="lazy"
                src={websiteItem.website_item_image}
                alt={websiteItem.website_item_name}
                className="object-cover absolute inset-0 size-full"
              />
              <div className="relative z-10 px-12 py-5 mt-0 mb-0 max-md:px-5 max-md:mb-2.5">
                {websiteItem.popularity > 0 ? "Best Seller" : ""}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            {websiteItem.additional_images.map((img, index) => (
              <img
                key={index}
                loading="lazy"
                src={img.image}
                alt={`Additional image ${index + 1}`}
                className="object-contain shrink-0 max-w-full rounded-none aspect-square w-[100px]"
              />
            ))}
          </div>
        </aside>

        {/* Right Side */}
        <section className="lg:w-2/3 flex flex-col lg:pl-16 lg:pr-0 max-md:pr-5 max-md:pl-0">
          <div className="flex z-10 flex-col items-start self-end max-w-full w-full lg:w-[775px]">
            <h1 className="text-4xl font-bold text-neutral-800 max-md:max-w-full">
              {websiteItem.website_item_name}
            </h1>
            <div className="mt-2 text-4xl text-zinc-500">
              {websiteItem.stock_uom}
            </div>
            <div className="mt-1 text-4xl font-bold text-sky-900">
              QAR {websiteItem.price.website_item_price.toFixed(2)}
            </div>
            <div className="flex gap-3.5 mt-2 text-2xl whitespace-nowrap leading-[52px] text-neutral-800">
              <div className="flex shrink-0 my-auto bg-sky-500 rounded-full fill-sky-500 h-[15px] w-[15px]" />
              <div>{websiteItem.in_stock ? "Available" : "Out of Stock"}</div>
            </div>

            {/* Main list rendering attribute title and sub-list */}
            {websiteItem.website_item_attributes?.map((attribute, index) => (
              <div key={index} className="mt-5">
                <h2 className="text-2xl font-semibold leading-none text-neutral-500">
                  {attribute.attribute_title}
                </h2>
                <div className="flex flex-wrap gap-3 self-stretch mt-6 text-lg text-black">
                  {attribute.attribute_style === "Icon" ? (
                    <CuttingOption
                      image={websiteItem.website_item_image} // Placeholder for the icon
                      label={attribute.attribute_value.value_title}
                    />
                  ) : (
                    <div>{attribute.attribute_value.value_title}</div>
                  )}
                </div>
              </div>
            ))}

            <div className="flex flex-wrap gap-10 self-stretch mt-9 w-full max-md:max-w-full">
              <div className="grow shrink my-auto text-2xl font-semibold text-black w-[152px]">
                Pick up Location
              </div>
              <div className="flex gap-10 text-xl">
                {locations.map((location, index) => (
                  <LocationButton
                    key={index}
                    name={location.name}
                    isActive={location.isActive}
                  />
                ))}
              </div>
            </div>

            <section className="flex z-10 flex-col mt-10 mb-0 w-full max-md:mb-2.5 max-md:max-w-full">
              <div className="flex flex-col max-w-full w-full lg:w-[837px]">
                <div className="flex items-center flex-wrap w-full justify-between">
                  <h2 className="mr-24 text-2xl font-semibold leading-none text-black max-md:mr-2.5">
                    Qatari ID
                  </h2>
                  <form className="flex gap-5 w-full max-w-[480px] mt-4 justify-between pl-8 rounded-sm border border-sky-700 border-solid shadow-[0px_3px_5px_rgba(0,0,0,0.051)] max-md:pl-5 max-md:max-w-full">
                    <label htmlFor="qidInput" className="sr-only">
                      Type your QID here
                    </label>
                    <input
                      id="qidInput"
                      type="text"
                      className="my-auto text-lg font-light text-zinc-500"
                      placeholder="Type your QID here"
                    />
                    <button
                      type="submit"
                      className="px-9 py-4 text-xl font-semibold text-sky-800 whitespace-nowrap bg-white rounded-none border-sky-700 border-solid shadow-sm border-[0.5px] max-md:px-5"
                    >
                      Validate
                    </button>
                  </form>
                </div>

                <div className="flex flex-wrap gap-5 justify-between mt-2 w-full max-md:max-w-full">
                  <div className="self-end mt-14 text-2xl font-semibold text-black max-md:mt-10">
                    Upload QID copy
                  </div>
                  <div className="flex gap-5 justify-between px-11 w-[480px] py-2.5 mt-9 max-md:mt-0 text-xl font-semibold text-sky-800 bg-white rounded border border-dashed shadow-sm border-neutral-300 max-md:px-5 max-md:max-w-full">
                    <div className="my-auto">Browse</div>
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/6cec8ae65bb1456eab23329b90da823d9c1e52eb6bbb29d5bfdb1bb52708414d?placeholderIfAbsent=true&apiKey=9810db3822b54ab583e896edd833d595"
                      alt=""
                      className="object-contain shrink-0 aspect-[1.46] w-[54px]"
                    />
                  </div>
                </div>
              </div>

              <div className="flex max-md:flex-col gap-7 self-end mt-7 w-full max-w-full">
                <QuantitySelector />
                <AddToCartButton price={websiteItem.price.website_item_price} />
              </div>

              <div className="mt-10">
                <div className="text-black text-[35px] font-bold font-['Montserrat']">
                  Nutrition Facts
                </div>
                <div className="w-[602px] h-[190px] text-[#707070] text-2xl font-['Montserrat'] leading-[35px]">
                  <span className="font-semibold">750 </span>
                  <span className="font-semibold lowercase">KCAL</span>
                  <span className="font-normal"> Per 100 Energy in kcal</span>
                  <br />
                  <span className="font-semibold">36 </span>
                  <span className="font-semibold lowercase">G</span>
                  <span className="font-normal"> Per 100 Protein</span>
                  <br />
                  <span className="font-semibold">00 </span>
                  <span className="font-semibold lowercase">G</span>
                  <span className="font-normal"> Per 100 Carbohydrates</span>
                  <br />
                  <span className="font-semibold">00 </span>
                  <span className="font-semibold lowercase">G</span>
                  <span className="font-normal"> Per 100 Sugar</span>
                  <br />
                  <span className="font-semibold">00 </span>
                  <span className="font-semibold lowercase">G</span>
                  <span className="font-normal"> Per 100 Fat</span>
                </div>
              </div>
            </section>
          </div>
        </section>
      </main>
      {websiteItem.short_description && (
        <div>
          <div className="text-black text-[35px] font-bold mt-20">
            Description
          </div>
          <div className="w-[1416.06px] h-[115.34px] text-[#707070] text-2xl font-normal font-['Montserrat'] leading-[30px]">
            {websiteItem.short_description}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
