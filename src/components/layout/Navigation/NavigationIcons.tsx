const NavigationIcons: React.FC = () => {
  const icons = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/8e9566bbbdcfafcbe746af0cc60580a903a780ae7e042f99d1d6514585994820?apiKey=9810db3822b54ab583e896edd833d595&&apiKey=9810db3822b54ab583e896edd833d595",
      alt: "",
      className: "object-contain shrink-0 aspect-[0.43] w-[13px]",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/406e35f61509d44e3477da4f22b8b6cad9ee7f9f86cfd315b6d0fe7283e15f00?apiKey=9810db3822b54ab583e896edd833d595&&apiKey=9810db3822b54ab583e896edd833d595",
      alt: "",
      className:
        "object-contain shrink-0 self-start mt-2 aspect-[1.18] w-[26px]",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/1a051073822eab09330608f04e91bc8dc5382278af098e177c4c4192c83dc460?apiKey=9810db3822b54ab583e896edd833d595&&apiKey=9810db3822b54ab583e896edd833d595",
      alt: "",
      className: "object-contain shrink-0 my-auto aspect-square w-[25px]",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/e8145b8f908a66c1df3adcb74a8578d9f90310879527dee073bb25d13c8d97d0?apiKey=9810db3822b54ab583e896edd833d595&&apiKey=9810db3822b54ab583e896edd833d595",
      alt: "",
      className:
        "object-contain shrink-0 self-start mt-2 aspect-square w-[22px]",
    },
  ];

  return (
    <div className="flex gap-5 justify-between">
      {icons.map((icon, index) => (
        <img
          key={index}
          loading="lazy"
          src={icon.src}
          alt={icon.alt}
          className={icon.className}
        />
      ))}
    </div>
  );
};

export default NavigationIcons;
