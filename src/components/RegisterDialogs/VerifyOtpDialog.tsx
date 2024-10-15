import React, { useState, useEffect, useRef } from "react";
import { Dialog } from "@headlessui/react";
import { XIcon } from "lucide-react";
import { sendOtp, verifyOtp } from "@/lib/queries/authApi";
import RegisterDialog from "./RegisterDialog";
import useUserStore from "@/lib/store/userStore";
import { getUser } from "@/lib/api/profile";
import { useDictionary } from "@/lib/hooks/useDictionary";

interface VerifyOtpDialogProps {
  isOpen: boolean;
  onClose: () => void;
  phoneNumber: string;
  onLoginSuccess: () => void;
}

const VerifyOtpDialog: React.FC<VerifyOtpDialogProps> = ({
  isOpen,
  onClose,
  phoneNumber,
  onLoginSuccess,
}) => {
  const { dictionary } = useDictionary();
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(36);
  const [attemptsLeft, setAttemptsLeft] = useState(4);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const setUser = useUserStore((state) => state.setUser);

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
    if (!/^[0-9]?$/.test(value)) return;

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

  const handleVerify = async () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.trim().length !== 6) {
      setErrorMessage(dictionary["enter6DigitOtp"]);
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
        const user = response.data.token
          ? await getUser(response.data.token)
          : null;
        if (user) {
          setUser({
            email: user.data.email,
            mobile_no: user.data.mobile_no,
            token: response.data.token,
            user_id: response.data.user_id,
            user_name: response.data.user_id,
            profile_details: {
              customer_details: {
                customer_name: user.data.first_name,
                nationality: user.data.nationality.country_name,
                salutation: user.data.salutation,
              },
              first_name: user.data.first_name,
              last_name: user.data.last_name,
            },
          });
          onLoginSuccess();
        } else {
          setIsRegisterDialogOpen(true);
        }
      } else {
        setAttemptsLeft((prev) => prev - 1);
        setErrorMessage(response?.message || dictionary["invalidOtp"]);

        if (attemptsLeft - 1 === 0) {
          setErrorMessage(dictionary["maxAttemptsExceeded"]);
        }
      }
    } catch (error) {
      setErrorMessage(dictionary["otpVerificationError"]);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    try {
      const response = await sendOtp({ mobile_no: phoneNumber });
      if (response && response.status_code === 200) {
        setTimer(36);
        setIsResendDisabled(true);
        setErrorMessage("");
        setAttemptsLeft(4);
        setOtp(["", "", "", "", "", ""]);
        inputRefs.current[0]?.focus();
      } else {
        setErrorMessage(dictionary["otpResendFailed"]);
      }
    } catch (error) {
      setErrorMessage(dictionary["otpResendError"]);
    }
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const handleClose = () => {
    setOtp(["", "", "", "", "", ""]);
    setTimer(36);
    setAttemptsLeft(4);
    setIsResendDisabled(true);
    setErrorMessage("");
    onClose();
  };

  const handleRegisterClose = () => {
    setIsRegisterDialogOpen(false);
    handleClose();
  };

  return (
    <>
      <Dialog open={isOpen} onClose={handleClose} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        <div className="fixed inset-0 flex  items-start top-14 justify-center p-4">
          <Dialog.Panel className="relative flex flex-col rounded-lg max-w-[600px] w-full bg-white p-8 shadow-lg">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              aria-label={dictionary["closeDialog"]}
            >
              <XIcon className="h-6 w-6" />
            </button>

            <Dialog.Title className="text-2xl font-semibold text-sky-900 mb-4">
              {dictionary["verifyNumberTitle"]}
            </Dialog.Title>

            <Dialog.Description className="text-lg text-gray-700 mb-6">
              {dictionary["verifyNumberDescription"]}
            </Dialog.Description>

            <div className="flex space-x-2 mb-4 self-center">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e.target, index)}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  className="w-[56.247px] h-[68.929px] text-center  rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                  aria-label={`OTP Digit ${index + 1}`}
                />
              ))}
            </div>

            {errorMessage && (
              <p className="mb-4 text-red-500 text-sm text-center">
                {errorMessage}
              </p>
            )}

            <div className="flex flex-col items-center justify-center mb-6 space-y-4">
              <div className="flex flex-col  gap-2 mt-2 items-center justify-between w-full max-w-sm">
                <span className="text-sm text-gray-600">
                  {dictionary["dontReceiveCode"]}
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
                  {dictionary["resendCode"]}
                </button>
              </div>

              <div className="flex flex-col items-center justify-between w-full max-w-sm">
                <span className="text-sm text-gray-600">
                  {dictionary["attemptsLeft"].replace(
                    "{attempts}",
                    String(attemptsLeft)
                  )}
                </span>
              </div>
            </div>

            <button
              onClick={handleVerify}
              disabled={isSubmitting}
              className={`mt-8 px-6 py-3 bg-primary text-white w-full font-semibold max-w-[250px]  hover:bg-primary focus:outline-none focus:ring-2  focus:ring-opacity-50 self-center ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? dictionary["verifying"] : dictionary["verify"]}
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>

      <RegisterDialog
        isOpen={isRegisterDialogOpen}
        onClose={handleRegisterClose}
        phoneNumber={phoneNumber}
      />
    </>
  );
};

export default VerifyOtpDialog;
