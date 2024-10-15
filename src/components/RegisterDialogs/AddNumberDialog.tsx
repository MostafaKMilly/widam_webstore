import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import PhoneInput from "./PhoneInput";
import { XIcon } from "lucide-react";
import { sendOtp } from "@/lib/queries/authApi";
import VerifyOtpDialog from "./VerifyOtpDialog";
import { useDictionary } from "@/lib/hooks/useDictionary";

interface AddNumberDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddNumberDialog: React.FC<AddNumberDialogProps> = ({
  isOpen,
  onClose,
}) => {
  const { dictionary } = useDictionary();
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
      setErrorMessage(dictionary["invalidPhoneNumber"]);
      return;
    }

    try {
      const response = await sendOtp({ mobile_no: phoneNumber.trim() });

      if (response && response.status_code === 200) {
        setErrorMessage("");
        setIsVerifyDialogOpen(true);
        onClose();
      } else {
        setErrorMessage(response?.message || dictionary["otpSendFailed"]);
      }
    } catch (error) {
      setErrorMessage(dictionary["otpSendError"]);
    }
  };

  const handleVerifySuccess = () => {
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
      <Dialog open={isOpen} onClose={handleClose} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        <div className="fixed inset-0 flex items-start top-14 justify-center p-4">
          <Dialog.Panel className="relative flex flex-col rounded-lg max-w-2xl w-full bg-white p-8 shadow-lg">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              aria-label={dictionary["closeDialog"]}
            >
              <XIcon className="h-6 w-6" />
            </button>

            <Dialog.Title className="text-2xl font-semibold text-sky-900 mb-4">
              {dictionary["enterMobileNumberTitle"]}
            </Dialog.Title>

            <Dialog.Description className="text-lg text-gray-700 mb-6">
              {dictionary["enterMobileNumberDescription"]}
            </Dialog.Description>

            <PhoneInput
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
            />

            {errorMessage && (
              <p className="mt-4 text-red-500 text-sm">{errorMessage}</p>
            )}

            <button
              onClick={handleConfirm}
              className={`mt-8 px-6 py-3 bg-primary text-white w-full font-semibold max-w-[250px] hover:bg-primary focus:outline-none focus:ring-2 focus:ring-opacity-50 self-center ${
                !isPhoneValid ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={!isPhoneValid}
            >
              {dictionary["confirm"]}
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>

      <VerifyOtpDialog
        isOpen={isVerifyDialogOpen}
        onClose={() => setIsVerifyDialogOpen(false)}
        phoneNumber={phoneNumber}
        onLoginSuccess={handleVerifySuccess}
      />
    </>
  );
};

export default AddNumberDialog;
