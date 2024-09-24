// VerifyOtpDialog.tsx
import React, { useState, useEffect, useRef } from "react";
import { Dialog } from "@headlessui/react";
import { XIcon } from "lucide-react";
import { sendOtp, verifyOtp } from "@/lib/queries/authApi";
import RegisterDialog from "./RegisterDialog"; // Import the RegisterDialog component

interface VerifyOtpDialogProps {
  isOpen: boolean;
  onClose: () => void;
  phoneNumber: string;
  onVerified: () => void;
}

const VerifyOtpDialog: React.FC<VerifyOtpDialogProps> = ({
  isOpen,
  onClose,
  phoneNumber,
  onVerified,
}) => {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(36); // 36 seconds
  const [attemptsLeft, setAttemptsLeft] = useState(4);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isOpen && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsResendDisabled(false);
      clearInterval(interval!);
    }

    return () => clearInterval(interval!);
  }, [isOpen, timer]);

  const handleChange = (element: HTMLInputElement, index: number) => {
    const value = element.value;
    if (!/^[0-9]?$/.test(value)) return; // Only allow single digits

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    if (!value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.trim().length !== 6) {
      setErrorMessage("Please enter the 6-digit OTP.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await verifyOtp({
        mobile_no: phoneNumber,
        otp: enteredOtp.trim(),
      });

      if (response && response.status_code === 200) {
        // OTP verified successfully
        console.log("OTP Verified:", response.data);
        onVerified();
        setIsRegisterDialogOpen(true); // Open RegisterDialog
      } else {
        // Handle verification failure
        setAttemptsLeft((prev) => prev - 1);
        setErrorMessage(response?.message || "Invalid OTP. Please try again.");

        if (attemptsLeft - 1 === 0) {
          // Exceeded maximum attempts
          setErrorMessage(
            "You have exceeded the maximum number of attempts. Please try again later."
          );
        }
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setErrorMessage(
        "An error occurred while verifying OTP. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    try {
      const response = await sendOtp({ mobile_no: phoneNumber });
      if (response && response.status_code === 200) {
        console.log("OTP Resent:", response.data);
        setTimer(36);
        setIsResendDisabled(true);
        setErrorMessage("");
        setAttemptsLeft(4);
        setOtp(["", "", "", "", "", ""]);
        inputRefs.current[0]?.focus();
      } else {
        setErrorMessage(
          response?.message || "Failed to resend OTP. Please try again."
        );
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
      setErrorMessage(
        "An error occurred while resending OTP. Please try again."
      );
    }
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasteData = e.clipboardData.getData("text");
    if (!/^\d{6}$/.test(pasteData)) {
      e.preventDefault();
      return;
    }
    const pasteOtp = pasteData.split("");
    setOtp(pasteOtp);
    pasteOtp.forEach((digit, idx) => {
      if (inputRefs.current[idx]) {
        inputRefs.current[idx]!.value = digit;
      }
    });
    inputRefs.current[5]?.focus();
  };

  const resetState = () => {
    setOtp(["", "", "", "", "", ""]);
    setTimer(36);
    setAttemptsLeft(4);
    setIsResendDisabled(true);
    setErrorMessage("");
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  const handleRegisterClose = () => {
    setIsRegisterDialogOpen(false);
    handleClose();
  };

  return (
    <>
      {/* Verify OTP Dialog */}
      <Dialog open={isOpen} onClose={handleClose} className="relative z-50">
        {/* Overlay */}
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        {/* Centered Panel */}
        <div className="fixed inset-0 flex  items-start top-14 justify-center p-4">
          <Dialog.Panel className="relative flex flex-col rounded-lg max-w-[600px] w-full bg-white p-8 shadow-lg">
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
              Hello Again!
              <br /> Let&apos;s verify your number.
            </Dialog.Title>

            {/* Description */}
            <Dialog.Description className="text-lg text-gray-700 mb-6">
              We&apos;ve sent you a code. Please enter the received code to
              proceed.
            </Dialog.Description>

            {/* OTP Inputs */}
            <div className="flex space-x-2 mb-4 self-center">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e.target, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={handlePaste}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  className="w-[56.247px] h-[68.929px] text-center  rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                  aria-label={`OTP Digit ${index + 1}`}
                  style={{
                    filter: "drop-shadow(0px 1px 0.5px rgba(0, 0, 0, 0.16))",
                  }}
                />
              ))}
            </div>

            {/* Error Message */}
            {errorMessage && (
              <p className="mb-4 text-red-500 text-sm self-center">
                {errorMessage}
              </p>
            )}

            <div className="flex flex-col items-center justify-center mb-6 space-y-4">
              {/* Resend Button */}
              <div className="flex flex-col  gap-2 mt-2 items-center justify-between w-full max-w-sm">
                <span className="text-sm text-gray-600">
                  Don&apos;t receive the code?
                </span>
                <div className="text-[#2BB9ED]">{formatTimer(timer)}</div>
                <button
                  onClick={handleResend}
                  disabled={isResendDisabled}
                  className={`text-sm ${
                    isResendDisabled
                      ? "text-midGray cursor-not-allowed"
                      : "text-[#707070] underline hover:underline"
                  }`}
                >
                  Resend my code
                </button>
              </div>

              {/* Timer and Attempts */}
              <div className="flex flex-col items-center justify-between w-full max-w-sm">
                <span className="text-sm text-gray-600">
                  You have {attemptsLeft} attempt{attemptsLeft !== 1 ? "s" : ""}{" "}
                  left
                </span>
              </div>
            </div>

            {/* Verify Button */}
            <button
              onClick={handleVerify}
              disabled={isSubmitting}
              className={`mt-8 px-6 py-3 bg-primary text-white w-full font-semibold max-w-[250px]  hover:bg-primary focus:outline-none focus:ring-2  focus:ring-opacity-50 self-center ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Verifying..." : "Verify"}
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Register Dialog */}
      <RegisterDialog
        isOpen={isRegisterDialogOpen}
        onClose={handleRegisterClose}
        phoneNumber={phoneNumber}
      />
    </>
  );
};

export default VerifyOtpDialog;
