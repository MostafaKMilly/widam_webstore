import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { XIcon } from "lucide-react";
import { User } from "@/lib/types/user.type";
import { useDictionary } from "@/lib/hooks/useDictionary";

interface EditProfileDialogProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  onSubmit: (updatedUserInfo: any) => void;
  isSubmitting: boolean;
  errorMessage: string;
}

const EditProfileDialog: React.FC<EditProfileDialogProps> = ({
  isOpen,
  onClose,
  user,
  onSubmit,
  isSubmitting,
  errorMessage,
}) => {
  const { dictionary } = useDictionary();

  const [salutation, setSalutation] = useState<string>(user.salutation || "");
  const [firstName, setFirstName] = useState<string>(user.first_name || "");
  const [lastName, setLastName] = useState<string>(user.last_name || "");
  const [email, setEmail] = useState<string>(user.email || "");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const isFormValid =
    salutation &&
    firstName.trim().length > 0 &&
    lastName.trim().length > 0 &&
    (email.trim() === "" || emailRegex.test(email));

  const handleSubmit = () => {
    if (!isFormValid) {
      return;
    }

    const updatedUserInfo = {
      salutation,
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      email: email.trim() || "",
      nationality: user.nationality.country_name,
    };

    onSubmit(updatedUserInfo);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-start top-14 justify-center p-4">
        <Dialog.Panel className="relative flex flex-col rounded-lg max-w-[600px] w-full bg-white p-8 shadow-lg">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            aria-label={dictionary["closeDialog"]}
          >
            <XIcon className="h-6 w-6" />
          </button>

          <Dialog.Title className="text-2xl font-semibold text-sky-900 mb-4">
            {dictionary["editProfile"]}
          </Dialog.Title>

          <div className="mb-6">
            <fieldset>
              <legend className="block text-sm font-medium text-gray-700 mb-2">
                {dictionary["title"]}
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
                  <span className="ml-2">{dictionary["mr"]}</span>
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
                  <span className="ml-2">{dictionary["missMs"]}</span>
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
                  <span className="ml-2">{dictionary["mrs"]}</span>
                </label>
              </div>
            </fieldset>
          </div>

          <div className="mb-4">
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {dictionary["firstName"]}
            </label>
            <input
              type="text"
              id="firstName"
              className="w-full border-b border-gray-300 focus:outline-none focus:border-sky-500 pb-2"
              placeholder={dictionary["enterFirstName"]}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {dictionary["lastName"]}
            </label>
            <input
              type="text"
              id="lastName"
              className="w-full border-b border-gray-300 focus:outline-none focus:border-sky-500 pb-2"
              placeholder={dictionary["enterLastName"]}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {dictionary["emailAddressOptional"]}
            </label>
            <input
              type="email"
              id="email"
              className="w-full border-b border-gray-300 focus:outline-none focus:border-sky-500 pb-2"
              placeholder={dictionary["enterEmail"]}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {errorMessage && (
            <p className="mb-4 text-red-500 text-sm text-center">
              {errorMessage}
            </p>
          )}

          <button
            onClick={handleSubmit}
            disabled={!isFormValid || isSubmitting}
            className={`mt-8 px-6 py-3 bg-primary text-white w-full font-semibold max-w-[250px] hover:bg-primary focus:outline-none focus:ring-2 focus:ring-opacity-50 self-center ${
              (!isFormValid || isSubmitting) && "opacity-50 cursor-not-allowed"
            }`}
          >
            {isSubmitting ? dictionary["saving"] : dictionary["save"]}
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default EditProfileDialog;
