import React from "react";
import MeatCategoryHeader from "./MeatCategoryHeader";
import MeatCategoryGrid from "./MeatCategoryGrid";
import MeatCategoryBanner from "./MeatCategoryBanner";

const MeetCategory: React.FC = () => {
  return (
    <main className="flex flex-col rounded-none">
      <section className="flex flex-col items-center px-4 pt-10 pb-6 w-full bg-[#FEEDE9] sm:px-10 md:px-20 sm:pt-16 md:pt-20 sm:pb-10 md:pb-12">
        <div className="flex flex-col w-full max-w-[1684px]">
          <MeatCategoryHeader />
          <MeatCategoryGrid />
          <MeatCategoryBanner />
        </div>
      </section>
    </main>
  );
};

export default MeetCategory;
