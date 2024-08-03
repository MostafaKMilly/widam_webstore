import React from "react";

const PaymentMethods: React.FC = () => {
  const paymentMethods = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/721d945938c14c4316bee55ff7dec833b4f4966dfdcd6dcee540117406290e68?apiKey=9810db3822b54ab583e896edd833d595&&apiKey=9810db3822b54ab583e896edd833d595",
      alt: "Visa",
      className: "object-contain shrink-0 my-auto w-20",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/7ed261ef0a759c2d49039257a1f7b04339850c4625369d49e7b1e9d187fb4dea?apiKey=9810db3822b54ab583e896edd833d595&&apiKey=9810db3822b54ab583e896edd833d595",
      alt: "Mastercard",
      className: "object-contain shrink-0 self-start w-12",
    },
    { text: "Cash", className: "text-2xl font-semibold text-sky-900 flex items-center justify-center" },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/a4060590f06773b83ed6d13045499364934b06ac1c0ca9b462387f69211d0727?apiKey=9810db3822b54ab583e896edd833d595&&apiKey=9810db3822b54ab583e896edd833d595",
      alt: "American Express",
      className: "object-contain shrink-0 self-start w-20 my-auto",
    },
  ];

  return (
    <div className="flex flex-wrap gap-5 justify-center text-2xl font-semibold text-sky-900 items-center whitespace-nowrap">
      {paymentMethods.map((method, index) =>
        method.src ? (
          <img
            key={index}
            loading="lazy"
            src={method.src}
            alt={method.alt}
            className={method.className}
          />
        ) : (
          <div key={index} className={method.className}>
            {method.text}
          </div>
        )
      )}
    </div>
  );
};

export default PaymentMethods;
