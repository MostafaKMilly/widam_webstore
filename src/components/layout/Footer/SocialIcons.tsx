const SocialIcons: React.FC = () => {
  const socialIcons = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/bcc9d70b7baea2b2bb41e2bf12bff40eaaf8af6932621ee13b49cf45e3a0da51?placeholderIfAbsent=true&apiKey=9810db3822b54ab583e896edd833d595",
      alt: "Facebook",
      className: "object-contain shrink-0 self-stretch aspect-[0.45] w-[13px]",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/a7061515abf3a7ecd9f64ab24b6811f34cece4b68af3e2dbba23dd51e643b0a2?placeholderIfAbsent=true&apiKey=9810db3822b54ab583e896edd833d595",
      alt: "Twitter",
      className: "object-contain shrink-0 mt-2.5 aspect-[1.25] w-[25px]",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/72c9ca91d1b86e42f63c7d3e1ea40d25c3e7dfea6d5b1ae25c5f15099ed7ea96?placeholderIfAbsent=true&apiKey=9810db3822b54ab583e896edd833d595",
      alt: "Instagram",
      className: "object-contain shrink-0 mt-1.5 w-6 aspect-square",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/df2c52e0c8a61aed0fb3678ae3790c8c41c2820ce4ee5a78f5936782642c3d37?placeholderIfAbsent=true&apiKey=9810db3822b54ab583e896edd833d595",
      alt: "LinkedIn",
      className: "object-contain shrink-0 mt-2 aspect-square w-[21px]",
    },
  ];

  return (
    <div className="flex flex-col self-start max-md:mx-auto">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/a2bdc3c6b57a997e6429a768f53aaea2b9a84f4f1d39da60969fa9b6c5d47c51?placeholderIfAbsent=true&apiKey=9810db3822b54ab583e896edd833d595"
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
