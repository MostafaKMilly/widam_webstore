import React from "react";

interface CategoryCardProps {
  imageSrc: string;
  title: string;
  altText: string;
  imageClassName?: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  imageSrc,
  title,
  altText,
  imageClassName,
}) => {
  return (
    <div className="flex flex-col flex-1 self-start mt-1.5">
      <div className="flex flex-col items-center pt-3.5 rounded-md bg-neutral-100 h-[159px] shadow-[0px_2px_2px_rgba(0,0,0,0.161)] w-[159px] sm:w-[130px] md:w-[150px] lg:w-[159px]">
        <img
          loading="lazy"
          src={imageSrc}
          alt={altText}
          className={`object-contain rounded-lg aspect-[1.1] w-[159px] sm:w-[130px] md:w-[150px] lg:w-[159px] ${imageClassName}`}
        />
      </div>
      <div className="self-center mt-4 text-2xl font-semibold text-center text-neutral-800">
        {title}
      </div>
    </div>
  );
};

export default CategoryCard;
