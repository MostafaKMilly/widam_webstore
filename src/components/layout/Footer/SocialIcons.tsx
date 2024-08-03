const SocialIcons: React.FC = () => {
  const socialIcons = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/ed246916d6ad0ed1702aafef6f8daa5881020817421a2296c1d0f1e3f0ed31a2?apiKey=9810db3822b54ab583e896edd833d595&&apiKey=9810db3822b54ab583e896edd833d595",
      alt: "Facebook",
      className: "object-contain shrink-0 self-stretch aspect-[0.45] w-[13px]",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/c010296f17ec764c7eca7e4a934ffc9d402e3fdf82c1c4d81357020e81c361aa?apiKey=9810db3822b54ab583e896edd833d595&&apiKey=9810db3822b54ab583e896edd833d595",
      alt: "Twitter",
      className: "object-contain shrink-0 mt-2.5 aspect-[1.25] w-[25px]",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/a8827761fba08d9651cd3af62355d9376f54643fd5f624cda18983ce83ff5cb0?apiKey=9810db3822b54ab583e896edd833d595&&apiKey=9810db3822b54ab583e896edd833d595",
      alt: "Instagram",
      className: "object-contain shrink-0 mt-1.5 w-6 aspect-square",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/3f734810f237072db469fb402c3186ec6755ee56a9aa08e9c587949992a6db2d?apiKey=9810db3822b54ab583e896edd833d595&&apiKey=9810db3822b54ab583e896edd833d595",
      alt: "LinkedIn",
      className: "object-contain shrink-0 mt-2 aspect-square w-[21px]",
    },
  ];

  return (
    <div className="flex flex-col self-start max-md:mx-auto">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/eb396800b52890f9a4904a2dd98f8260f836372f5307e909fa1982f0bb40b7bd?apiKey=9810db3822b54ab583e896edd833d595&&apiKey=9810db3822b54ab583e896edd833d595"
        alt="Company Logo"
        className="object-contain self-center max-w-full aspect-[1.83] w-[110px]"
      />
      <div className="flex gap-5 justify-between items-start mt-11 max-md:mt-10">
        {socialIcons.map((icon, index) => (
          <a href="#" key={index} aria-label={icon.alt}>
            <img
              loading="lazy"
              src={icon.src}
              alt={icon.alt}
              className={icon.className}
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default SocialIcons;
