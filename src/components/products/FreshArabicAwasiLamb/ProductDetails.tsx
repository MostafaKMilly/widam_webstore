// /components/ProductDetails.tsx
"use client";
import React, { useState } from "react";
import CuttingOption from "./CuttingOption";
import LocationButton from "./LocationButton";
import QuantitySelector from "./QuantitySelector";
import AddToCartButton from "./AddToCartButton";
import { WebsiteItem } from "@/lib/queries/getWebsiteItem";
import useCartStore from "@/lib/store/cartStore";
import toast from "react-hot-toast";
import { useDictionary } from "@/lib/hooks/useDictionary";
import {
  NutritionFacts,
  nutritionFactsMapping,
} from "@/lib/helpers/nutrationFacts";
import useUserStore from "@/lib/store/userStore";
import { useRouter } from "next/navigation";
import AddNumberDialog from "@/components/RegisterDialogs/AddNumberDialog";

const ProductDetails = ({
  websiteItem,
}: {
  websiteItem: WebsiteItem | undefined;
}) => {
  const { dictionary } = useDictionary(); // Access translations
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const addItem = useCartStore((state) => state.addItem);

  // Static locations for now
  const locations = [{ name: "Al Wakra" }, { name: "Al Sailiya" }];

  // State Management
  const [selectedAttributes, setSelectedAttributes] = useState<{
    [attributeId: string]: string;
  }>({});
  const [selectedLocation, setSelectedLocation] = useState<string>(
    locations[0].name
  );
  const [qid, setQid] = useState<string>("");
  const [qidFile, setQidFile] = useState<File | null>(null);
  const [quantity, setQuantity] = useState<number>(websiteItem?.min_qty || 1);
  const [isAddNumberOpen, setIsAddNumberOpen] = useState(false);

  // Handler for selecting attribute variants
  const handleAttributeSelect = (attributeId: string, valueId: string) => {
    setSelectedAttributes((prev) => ({
      ...prev,
      [attributeId]: valueId,
    }));
  };

  // Handler for location selection
  const handleLocationSelect = (locationName: string) => {
    setSelectedLocation(locationName);
  };

  // Handler for QID input
  const handleQidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQid(e.target.value);
  };

  // Handler for QID validation
  const handleQidValidate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Implement your QID validation logic here
    console.log("Validating QID:", qid);
    // Example: Simple validation (length check)
    if (qid.length === 11) {
      toast.success(dictionary.qidValid || "QID is valid.");
    } else {
      toast.error(dictionary.qidInvalid || "QID must be 11 characters.");
    }
  };

  // Handler for file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setQidFile(e.target.files[0]);
      console.log("Uploaded file:", e.target.files[0]);
    }
  };

  // Handler for Add to Cart
  const handleAddToCart = async () => {
    // Ensure required selections are made
    const requiredAttributes = websiteItem?.attribute_variants || [];
    for (let attr of requiredAttributes) {
      if (!selectedAttributes[attr.attribute_id]) {
        toast.error(
          `${dictionary.pleaseSelect} ${attr.attribute_title}` ||
            `Please select a value for ${attr.attribute_title}`
        );
        return;
      }
    }

    if (!user) {
      setIsAddNumberOpen(true);
      return;
    }

    try {
      // Construct a unique ID for the cart item (e.g., website_item_id + selected variants)
      const variantIds = Object.values(selectedAttributes).join("-");
      const cartItemId = `${websiteItem?.website_item_id}-${variantIds}`;

      // Find the selected variant to get specific details (like image)
      // For simplicity, assume one attribute with variants
      let selectedVariant = null;
      if (
        websiteItem?.attribute_variants &&
        websiteItem.attribute_variants.length > 0
      ) {
        const attribute = websiteItem.attribute_variants[0];
        selectedVariant = attribute.attribute_value.find(
          (val) => val.value_id === selectedAttributes[attribute.attribute_id]
        );
      }

      await addItem(websiteItem!, 1);
      toast.success(dictionary.itemAddedToCart || "Item added to cart!");
    } catch (error) {
      console.error("Error adding item to cart:", error);
      toast.error("Failed to add item to cart.");
    }
  };

  if (!websiteItem) {
    return (
      <div className="text-center py-20">
        {dictionary.loading || "Loading..."}
      </div>
    );
  }

  // Fetch nutrition facts based on stock_uom
  const nutritionFacts: NutritionFacts | undefined =
    nutritionFactsMapping[websiteItem.stock_uom];

  return (
    <div className="px-20 pt-16 w-full shadow-sm bg-slate-50 max-md:px-5 max-md:pb-5 pb-10 max-md:max-w-full">
      <main className="flex flex-col lg:flex-row">
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

              {/* Tags Overlay */}
              <div className="absolute top-2 right-2 flex flex-col space-y-2">
                {websiteItem.tags.map((tag) => (
                  <img
                    key={tag.id}
                    src={tag.icon}
                    alt={tag.title}
                    className="w-6 h-6 mr-2"
                  />
                ))}
              </div>

              {/* Popularity Badge */}
              {websiteItem.popularity > 0 && (
                <div className="relative z-10 px-12 py-5 mt-0 mb-0 max-md:px-5 max-md:mb-2.5">
                  {dictionary.bestSeller || "Best Seller"}
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {websiteItem.additional_images.map((img, index) => (
              <img
                key={index}
                loading="lazy"
                src={img.image}
                alt={`Additional image ${index + 1}`}
                className="object-contain shrink-0 max-w-full rounded-none aspect-square w-[100px] max-md:w-24"
              />
            ))}
          </div>
        </aside>

        {/* Right Side */}
        <section className="lg:w-2/3 flex flex-col lg:pl-16 lg:pr-0 max-md:pr-5 max-md:pl-0">
          <div className="flex z-10 flex-col items-start self-end max-w-full w-full lg:w-[775px]">
            <h1 className="text-4xl font-bold text-neutral-800 max-md:text-2xl max-md:max-w-full">
              {websiteItem.website_item_name}
            </h1>
            <div className="mt-2 text-4xl text-zinc-500 max-md:text-lg">
              {websiteItem.stock_uom}
            </div>
            <div className="mt-1 text-4xl font-bold text-sky-900 max-md:text-2xl">
              QAR {websiteItem.price.website_item_price.toFixed(2)}
            </div>
            <div className="flex gap-3.5 mt-2 text-2xl whitespace-nowrap leading-[52px] text-neutral-800 max-md:text-lg">
              <div className="flex shrink-0 my-auto bg-sky-500 rounded-full fill-sky-500 h-[15px] w-[15px] max-md:h-4 max-md:w-4" />
              <div>
                {websiteItem.in_stock
                  ? dictionary.available || "Available"
                  : dictionary.outOfStock || "Out of Stock"}
              </div>
            </div>

            {websiteItem.attribute_variants?.map((variant) => (
              <div key={variant.attribute_id} className="mt-5">
                <h2 className="text-2xl font-semibold leading-none text-neutral-500 max-md:text-lg">
                  {variant.attribute_title}
                </h2>
                <div
                  className={`flex gap-3 mt-6 text-lg text-black ${
                    variant.attribute_style === "Icon"
                      ? "flex-wrap whitespace-nowrap scrollbar-thin scrollbar-thumb-sky-500 scrollbar-track-gray-200 max-md:flex-wrap max-md:gap-2"
                      : "flex-wrap max-md:gap-2"
                  }`}
                >
                  {variant.attribute_style === "Icon"
                    ? variant.attribute_value.map((value) => (
                        <CuttingOption
                          key={value.value_id}
                          image={value.icon}
                          label={value.value_title}
                          isSelected={
                            selectedAttributes[variant.attribute_id] ===
                            value.value_id
                          }
                          onSelect={() =>
                            handleAttributeSelect(
                              variant.attribute_id,
                              value.value_id
                            )
                          }
                        />
                      ))
                    : variant.attribute_value.map((value) => (
                        <button
                          key={value.value_id}
                          className={`px-4 py-2 border rounded ${
                            selectedAttributes[variant.attribute_id] ===
                            value.value_id
                              ? "bg-sky-500 text-white"
                              : "bg-white text-black border-zinc-400 hover:bg-gray-100"
                          } text-sm max-md:px-2 max-md:py-1`}
                          onClick={() =>
                            handleAttributeSelect(
                              variant.attribute_id,
                              value.value_id
                            )
                          }
                        >
                          {value.value_title}
                        </button>
                      ))}
                </div>
              </div>
            ))}

            {/* Pick up Location */}
            <div className="flex flex-wrap gap-10 self-stretch mt-9 w-full max-md:flex-col max-md:gap-4">
              <div className="grow shrink my-auto text-2xl font-semibold text-black w-[152px] max-md:w-full">
                {dictionary["Pick up Location"] || "Pick up Location"}
              </div>
              <div className="flex gap-10 text-xl max-md:gap-4 max-md:flex-wrap max-md:w-full">
                {locations.map((location, index) => (
                  <LocationButton
                    key={index}
                    name={location.name}
                    isActive={selectedLocation === location.name}
                    onClick={() => handleLocationSelect(location.name)}
                  />
                ))}
              </div>
            </div>

            {/* QID Section */}
            <section className="flex z-10 flex-col mt-10 mb-0 w-full max-md:mb-2.5 max-md:max-w-full">
              <div className="flex flex-col max-w-full w-full lg:w-[837px]">
                <div className="flex items-center flex-wrap w-full justify-between max-md:flex-col max-md:items-start">
                  <h2 className="mr-24 text-2xl font-semibold leading-none text-black max-md:mr-0 max-md:mb-2 max-md:text-lg">
                    {dictionary["Qatari ID"] || "Qatari ID"}
                  </h2>
                  <form
                    className="flex gap-5 w-full max-w-[480px] mt-4 justify-between md:pl-8 rounded-sm md:border border-sky-700 md:border-solid shadow-[0px_3px_5px_rgba(0,0,0,0.051)]  max-md:max-w-full max-md:flex-col max-md:gap-4"
                    onSubmit={handleQidValidate}
                  >
                    <label htmlFor="qidInput" className="sr-only">
                      {dictionary.typeQidHere || "Type your QID here"}
                    </label>
                    <input
                      id="qidInput"
                      type="text"
                      className="w-full px-4 py-2 text-lg font-light text-zinc-500 bg-transparent max-md:border max-md:border-zinc-300 rounded-md focus:outline-none   max-md:w-full"
                      placeholder={
                        dictionary.typeQidHere || "Type your QID here"
                      }
                      value={qid}
                      onChange={handleQidChange}
                      required
                    />
                    <button
                      type="submit"
                      className="w-auto px-9 py-4 text-xl font-semibold text-sky-800 whitespace-nowrap bg-white rounded-md border border-sky-700 border-solid shadow-sm hover:bg-sky-100 max-md:w-full max-md:px-5 max-md:text-base"
                    >
                      {dictionary.validate || "Validate"}
                    </button>
                  </form>
                </div>

                <div className="flex flex-wrap gap-5 justify-between mt-8 w-full max-md:flex-col max-md:gap-2 items-center">
                  <div className="self-center max-md:self-start text-2xl font-semibold text-black max-md:mt-10 max-md:text-lg">
                    {dictionary["Upload QID copy"] || "Upload QID copy"}
                  </div>
                  <div className="flex items-center gap-5 justify-between px-11 w-[480px] py-2.5  max-md:mt-0 text-xl font-semibold text-sky-800 bg-white rounded border border-dashed shadow-sm border-neutral-300 max-md:px-5 max-md:max-w-full">
                    <label
                      htmlFor="qidFile"
                      className="flex-grow cursor-pointer  max-md:text-base"
                    >
                      {dictionary.browse || "Browse"}
                    </label>
                    <input
                      id="qidFile"
                      type="file"
                      accept=".jpg,.jpeg,.png,.pdf"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/6cec8ae65bb1456eab23329b90da823d9c1e52eb6bbb29d5bfdb1bb52708414d?placeholderIfAbsent=true&apiKey=9810db3822b54ab583e896edd833d595"
                      alt={dictionary.uploadIcon || "Upload Icon"}
                      className="object-contain shrink-0 aspect-[1.46] w-[54px] max-md:w-12 max-md:h-12"
                    />
                  </div>
                </div>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="flex max-md:flex-col gap-7 self-end mt-7 w-full max-w-full">
                <QuantitySelector
                  quantity={quantity}
                  min={websiteItem.min_qty}
                  max={websiteItem.max_qty}
                  onChange={setQuantity}
                />
                <AddToCartButton
                  price={websiteItem.price.website_item_price}
                  onClick={handleAddToCart}
                />
              </div>

              {/* Nutrition Facts */}
              {nutritionFacts && (
                <div className="mt-10">
                  <div className="text-black text-[35px] font-bold font-montserrat">
                    {dictionary["Nutrition Facts"] || "Nutrition Facts"}
                  </div>
                  <div className="w-[602px] h-auto text-[#707070] text-2xl font-montserrat leading-[35px]">
                    <div>
                      <span className="font-semibold">
                        {nutritionFacts.kcal}{" "}
                      </span>
                      <span className="font-semibold lowercase">
                        {dictionary.nutritionKcal || "KCAL"}
                      </span>
                      <span className="font-normal">
                        {" "}
                        {dictionary.per100Energy || "Per 100 Energy in kcal"}
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold">
                        {nutritionFacts.protein}{" "}
                      </span>
                      <span className="font-semibold lowercase">
                        {dictionary.nutritionProtein || "g"}
                      </span>
                      <span className="font-normal">
                        {" "}
                        {dictionary.per100Protein || "Per 100 Protein"}
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold">
                        {nutritionFacts.carbohydrates}{" "}
                      </span>
                      <span className="font-semibold lowercase">
                        {dictionary.nutritionCarbohydrates || "g"}
                      </span>
                      <span className="font-normal">
                        {" "}
                        {dictionary.per100Carbohydrates ||
                          "Per 100 Carbohydrates"}
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold">
                        {nutritionFacts.sugar}{" "}
                      </span>
                      <span className="font-semibold lowercase">
                        {dictionary.nutritionSugar || "g"}
                      </span>
                      <span className="font-normal">
                        {" "}
                        {dictionary.per100Sugar || "Per 100 Sugar"}
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold">
                        {nutritionFacts.fat}{" "}
                      </span>
                      <span className="font-semibold lowercase">
                        {dictionary.nutritionFat || "g"}
                      </span>
                      <span className="font-normal">
                        {" "}
                        {dictionary.per100Fat || "Per 100 Fat"}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </section>
          </div>
        </section>
      </main>
      {websiteItem.short_description && (
        <div className="mt-10 px-5">
          <div className="text-black text-[35px] font-bold mt-20 max-md:text-2xl">
            {dictionary.Description || "Description"}
          </div>
          <div className="w-full h-auto text-[#707070] text-2xl font-normal font-montserrat leading-[30px] max-md:w-full max-md:text-base">
            {websiteItem.short_description}
          </div>
        </div>
      )}

      {/* Registration/Login Dialog */}
      <AddNumberDialog
        isOpen={isAddNumberOpen}
        onClose={() => setIsAddNumberOpen(false)}
      />
    </div>
  );
};

export default ProductDetails;
