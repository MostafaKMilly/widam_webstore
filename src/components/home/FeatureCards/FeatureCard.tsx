import React from "react";

interface FeatureCardProps {
  color: string;
  icon: string;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  color,
  icon,
  title,
  description,
}) => {
  return (
    <article
      className="flex  grow gap-10 relative  pr-4 w-full bg-white shadow-sm max-md:mt-10  h-[148px] max-w-[520px] max-md:max-w-full"
      style={{ boxShadow: "0px 0px 7.5px 0px rgba(0, 0, 0, 0.16)" }}
    >
      <div className={`flex shrink-0 w-1 bg-[#004990] h-full`} />
      <img
        loading="lazy"
        src={icon}
        alt=""
        className="object-contain shrink-0  w-[54px]"
      />
      <div className="flex flex-col items-start self-center mt-2.5">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/3bdd7ae948a4a1718e9624df98dd5a7b4692e5a357dc1156d1dd1927d2381cd2?apiKey=9810db3822b54ab583e896edd833d595&&apiKey=9810db3822b54ab583e896edd833d595"
          alt=""
          className="object-contain self-end aspect-square w-[21px] absolute top-4 right-4"
        />
        <h2 className={`text-2xl font-semibold`} style={{ color }}>
          {title}
        </h2>
        <p className="mt-1.5 text-lg font-medium leading-6 text-neutral-500">
          {description}
        </p>
      </div>
    </article>
  );
};

export default FeatureCard;
