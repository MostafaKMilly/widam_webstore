import React from "react";

const MeatCategoryHeader: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-2xl font-bold text-neutral-800 sm:text-3xl md:text-4xl">
        Browse All Meat Category
      </h1>
      <p className="mt-2 text-base text-zinc-500 sm:text-lg md:text-xl">
        Browse All Meat Category and shop <br /> then check if you want to
        subscribe
      </p>
    </header>
  );
};

export default MeatCategoryHeader;
