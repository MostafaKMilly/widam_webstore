// AddNumberDialog.tsx
import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import PhoneInput from "./PhoneInput";
import { XIcon } from "lucide-react";
import { sendOtp } from "@/lib/queries/authApi";
import VerifyOtpDialog from "./VerifyOtpDialog";

interface AddNumberDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddNumberDialog: React.FC<AddNumberDialogProps> = ({
  isOpen,
  onClose,
}) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isVerifyDialogOpen, setIsVerifyDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isPhoneValid, setIsPhoneValid] = useState(false);

  const handlePhoneNumberChange = (value: string) => {
    setPhoneNumber(value);
    const isValid = /^[3-6]\d{7}$/.test(value);
    setIsPhoneValid(isValid);
  };

  const handleConfirm = async () => {
    if (!isPhoneValid) {
      setErrorMessage("Please enter a valid Qatari mobile number.");
      return;
    }

    try {
      const response = await sendOtp({ mobile_no: phoneNumber.trim() });

      if (response && response.status_code === 200) {
        console.log("OTP sent successfully:", response.data);
        setErrorMessage("");
        setIsVerifyDialogOpen(true);
        onClose();
      } else {
        setErrorMessage(
          response?.message || "Failed to send OTP. Please try again."
        );
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      setErrorMessage("An error occurred while sending OTP. Please try again.");
    }
  };

  const handleVerifySuccess = () => {
    // Handle successful verification (e.g., navigate to dashboard, close all dialogs, etc.)
    onClose();
  };

  const handleClose = () => {
    setPhoneNumber("");
    setErrorMessage("");
    setIsVerifyDialogOpen(false);
    onClose();
  };

  return (
    <>
      {/* Add Number Dialog */}
      <Dialog open={isOpen} onClose={handleClose} className="relative z-50">
        {/* Overlay */}
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        {/* Centered Panel */}
        <div className="fixed inset-0 flex items-start top-14 justify-center p-4">
          <Dialog.Panel className="relative flex flex-col rounded-lg max-w-2xl w-full bg-white p-8 shadow-lg">
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              aria-label="Close dialog"
            >
              <XIcon className="h-6 w-6" />
            </button>

            {/* Title */}
            <Dialog.Title className="text-2xl font-semibold text-sky-900 mb-4">
              Enter your <br /> mobile number!
            </Dialog.Title>

            {/* Description */}
            <Dialog.Description className="text-lg text-gray-700 mb-6">
              Please enter your phone number to register or to sign in to your
              existing account. We will send a verification code!
            </Dialog.Description>

            {/* Phone Input */}
            <PhoneInput
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
            />

            {/* Error Message */}
            {errorMessage && (
              <p className="mt-4 text-red-500 text-sm">{errorMessage}</p>
            )}

            {/* Confirm Button */}
            <button
              onClick={handleConfirm}
              className={`mt-8 px-6 py-3 bg-primary text-white w-full font-semibold max-w-[250px]  hover:bg-primary focus:outline-none focus:ring-2  focus:ring-opacity-50 self-center ${
                !isPhoneValid ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={!isPhoneValid}
            >
              Confirm
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Verify OTP Dialog */}
      <VerifyOtpDialog
        isOpen={isVerifyDialogOpen}
        onClose={() => setIsVerifyDialogOpen(false)}
        phoneNumber={phoneNumber}
        onVerified={handleVerifySuccess}
      />
    </>
  );
};

export default AddNumberDialog;
