const ActionButtons: React.FC = () => {
  return (
    <div className="flex relative flex-wrap gap-5 justify-between items-start w-full mt-[574px] max-md:mt-10 max-md:max-w-full">
      <button className="flex gap-2 px-6 py-3 mt-3.5 text-lg font-bold bg-white rounded text-neutral-800 max-md:px-5">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/6f1a718ec66fe747bf43b47bcbeeed9b80f00fa29da641d02d6e49dbb93fd8af?apiKey=9810db3822b54ab583e896edd833d595&&apiKey=9810db3822b54ab583e896edd833d595"
          alt=""
          className="object-contain shrink-0 self-start aspect-[0.81] w-[17px]"
        />
        <span className="flex-auto">Locate Me</span>
      </button>
      <button className="self-stretch px-16 py-4 text-2xl font-semibold text-white bg-sky-700 rounded max-md:px-5">
        Confirm Location
      </button>
      <button className="px-8 py-3 mt-4 text-xl font-medium text-red-500 whitespace-nowrap bg-white rounded max-md:px-5">
        Skip
      </button>
    </div>
  );
};

export default ActionButtons;
