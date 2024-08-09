import React from "react";

interface ActionButtonsProps {
  onLocateMe: () => void;
  onConfirmLocation: () => void;
  onSkip: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onLocateMe,
  onConfirmLocation,
  onSkip,
}) => {
  return (
    <div className="absolute bottom-8 w-full left-0 px-6">
      <div className="flex w-full z-10 flex-wrap gap-5 justify-between items-center mt-4 max-md:mt-10">
        <button
          className="flex gap-2 px-6 py-3 text-lg font-bold bg-white rounded text-neutral-800 max-md:px-5"
          onClick={onLocateMe}
        >
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/6f1a718ec66fe747bf43b47bcbeeed9b80f00fa29da641d02d6e49dbb93fd8af?apiKey=9810db3822b54ab583e896edd833d595&&apiKey=9810db3822b54ab583e896edd833d595"
            alt=""
            className="object-contain shrink-0 self-start aspect-[0.81] w-[17px]"
          />
          <span className="flex-auto max-md:hidden">Locate Me</span>
        </button>
        <button
          className="self-stretch px-8 md:px-16 py-3 md:py-4 text-lg md:text-2xl font-semibold text-white bg-sky-700 rounded max-md:px-5"
          onClick={onConfirmLocation}
        >
          Confirm Location
        </button>
        <button
          className="px-4 md:px-8 py-2 md:py-3 text-lg md:text-xl font-medium text-red-500 whitespace-nowrap bg-white rounded max-md:px-5"
          onClick={onSkip}
        >
          Skip
        </button>
      </div>
    </div>
  );
};

export default ActionButtons;
