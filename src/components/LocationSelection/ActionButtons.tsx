import React from "react";

interface ActionButtonsProps {
  onLocateMe: () => void;
  onConfirmLocation: () => void;
  onSkip: () => void;
  isLoading: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onLocateMe,
  onConfirmLocation,
  onSkip,
  isLoading, // Destructure isLoading prop
}) => {
  return (
    <div className="absolute bottom-8 w-full left-0 px-6">
      <div className="flex w-full z-10 flex-wrap gap-5 justify-between items-center mt-4 max-md:mt-10">
        <button
          className="flex gap-2 px-6 py-3 text-lg font-bold bg-white rounded text-neutral-800 max-md:px-5"
          onClick={onLocateMe}
          disabled={isLoading} // Optional: Disable other buttons if needed
        >
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/6f1a718ec66fe747bf43b47bcbeeed9b80f00fa29da641d02d6e49dbb93fd8af?apiKey=9810db3822b54ab583e896edd833d595&&apiKey=9810db3822b54ab583e896edd833d595"
            alt="Locate Icon"
            className="object-contain shrink-0 self-start aspect-[0.81] w-[17px]"
          />
          <span className="flex-auto max-md:hidden">Locate Me</span>
        </button>
        <button
          className={`self-stretch px-8 md:px-16 py-3 md:py-4 text-lg md:text-2xl font-semibold text-white bg-sky-700 rounded max-md:px-5 flex items-center justify-center ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={onConfirmLocation}
          disabled={isLoading} // Disable the button when loading
        >
          {isLoading ? (
            // You can replace this with a spinner icon if desired
            <>
              <svg
                className="animate-spin h-5 w-5 mr-3 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
              Confirming...
            </>
          ) : (
            "Confirm Location"
          )}
        </button>
        <button
          className="px-4 md:px-8 py-2 md:py-3 text-lg md:text-xl font-medium text-red-500 whitespace-nowrap bg-white rounded max-md:px-5"
          onClick={onSkip}
          disabled={isLoading} // Optional: Disable other buttons if needed
        >
          Skip
        </button>
      </div>
    </div>
  );
};

export default ActionButtons;
