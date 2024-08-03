import DealsOfTheDay from "@/components/home/DealsOfTheDay/DealsOfTheDay";
import FeatureCards from "@/components/home/FeatureCards/FeatureCards";
import MeetCategory from "@/components/home/MeatCategory/MeatCategoryPage";
import ShopByCategory from "@/components/home/ShopByCategory/ShopByCategory";
import SubscriptionProducts from "@/components/home/SubscriptionProducts/SubscriptionProducts";
import React from "react";

function HomePage() {
  return (
    <div>
      <div className="p-8">
        <FeatureCards />
        <DealsOfTheDay />
        <ShopByCategory />
      </div>
      <MeetCategory />
      <SubscriptionProducts />
    </div>
  );
}

export default HomePage;
