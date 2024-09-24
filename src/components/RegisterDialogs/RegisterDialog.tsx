// RegisterDialog.tsx
import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { XIcon } from "lucide-react";
import { register } from "@/lib/queries/authApi"; // Adjust the import path as needed
import useUserStore from "@/lib/store/userStore";

interface RegisterDialogProps {
  isOpen: boolean;
  onClose: () => void;
  phoneNumber: string;
}

const RegisterDialog: React.FC<RegisterDialogProps> = ({
  isOpen,
  onClose,
  phoneNumber,
}) => {
  const [salutation, setSalutation] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const setUser = useUserStore((state) => state.setUser);

  // Regular expression for basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const isFormValid =
    salutation &&
    firstName.trim().length > 0 &&
    lastName.trim().length > 0 &&
    (email.trim() === "" || emailRegex.test(email)) &&
    termsAccepted;

  const handleSubmit = async () => {
    if (!isFormValid) {
      setErrorMessage("Please fill out all required fields correctly.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await register({
        salutation,
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        email: email.trim() || "",
        mobile_no: phoneNumber.trim(),
        nationality: "Qatar",
      });

      if (response && response.status_code === 201) {
        console.log("User registered successfully:", response.data);
        onClose();
        setUser(response.data);
      } else {
        setErrorMessage(
          response?.message || "Registration failed. Please try again."
        );
      }
    } catch (error) {
      console.error("Error registering user:", error);
      setErrorMessage(
        "An error occurred during registration. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex  items-start top-14 justify-center p-4">
        <Dialog.Panel className="relative flex flex-col rounded-lg max-w-[600px] w-full bg-white p-8 shadow-lg">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            aria-label="Close dialog"
          >
            <XIcon className="h-6 w-6" />
          </button>

          <Dialog.Title className="text-2xl font-semibold text-sky-900 mb-4 ">
            New account!
          </Dialog.Title>

          <Dialog.Description className="text-lg text-gray-700 mb-6">
            No account linked to your phone number. We&apos;ll create a new one
            using this number:{" "}
            <span className="font-medium text-primary">+974{phoneNumber}</span>
          </Dialog.Description>

          <div className="mb-6">
            <fieldset>
              <legend className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </legend>
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="salutation"
                    value="Mr"
                    checked={salutation === "Mr"}
                    onChange={(e) => setSalutation(e.target.value)}
                    className="form-radio h-4 w-4 text-sky-600"
                  />
                  <span className="ml-2">Mr.</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="salutation"
                    value="Miss/Ms"
                    checked={salutation === "Miss/Ms"}
                    onChange={(e) => setSalutation(e.target.value)}
                    className="form-radio h-4 w-4 text-sky-600"
                  />
                  <span className="ml-2">Miss/Ms.</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="salutation"
                    value="Mrs"
                    checked={salutation === "Mrs"}
                    onChange={(e) => setSalutation(e.target.value)}
                    className="form-radio h-4 w-4 text-sky-600"
                  />
                  <span className="ml-2">Mrs.</span>
                </label>
              </div>
            </fieldset>
          </div>

          <div className="mb-4">
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              className="w-full border-b border-gray-300 focus:outline-none focus:border-sky-500 pb-2"
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              className="w-full border-b border-gray-300 focus:outline-none focus:border-sky-500 pb-2"
              placeholder="Enter your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address (optional)
            </label>
            <input
              type="email"
              id="email"
              className="w-full border-b border-gray-300 focus:outline-none focus:border-sky-500 pb-2"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-6 flex items-center">
            <input
              type="checkbox"
              id="terms"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
              I have read and agree to the Terms and Conditions
            </label>
          </div>

          {errorMessage && (
            <p className="mb-4 text-red-500 text-sm text-center">
              {errorMessage}
            </p>
          )}

          <button
            onClick={handleSubmit}
            disabled={!isFormValid || isSubmitting}
            className={`mt-8 px-6 py-3 bg-primary text-white w-full font-semibold max-w-[250px]  hover:bg-primary focus:outline-none focus:ring-2  focus:ring-opacity-50 self-center ${
              (!isFormValid || isSubmitting) && "opacity-50 cursor-not-allowed"
            }`}
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default RegisterDialog;
