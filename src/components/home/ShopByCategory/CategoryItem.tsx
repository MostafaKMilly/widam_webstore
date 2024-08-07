/**
 * This code was generated by Builder.io.
 */
import React from "react";

interface CategoryItemProps {
  name: string;
  image: string;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ name, image }) => {
  return (
    <div className="flex flex-col flex-1 text-2xl font-semibold text-center whitespace-nowrap text-neutral-800">
      <img
        loading="lazy"
        src={image}
        alt={name}
        className="object-contain w-44 rounded-lg aspect-square"
      />
      <div className="self-center mt-1.5">{name}</div>
    </div>
  );
};

export default CategoryItem;
