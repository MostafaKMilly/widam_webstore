"use client";

import React from "react";
import AccountInfo from "@/components/MyAccountComponents/AccountInfo";
import AddressComponent from "@/components/MyAccountComponents/DefaultAddress";
import PaymentCards from "@/components/MyAccountComponents/PaymentCards";
import useUserStore from "@/lib/store/userStore";
import AddNumberDialog from "@/components/RegisterDialogs/AddNumberDialog";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/lib/api/profile";
import { useDictionary } from "@/lib/hooks/useDictionary";

function SettingsPage() {
  const { dictionary } = useDictionary();
  const { data: user, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getUser(),
  });

  const [isAddNumberOpen, setIsAddNumberOpen] = React.useState(false);

  return (
    <section className="flex flex-col ml-5 w-9/12 max-md:ml-0 max-md:w-full">
      <h1 className="self-start text-2xl font-medium text-sky-900 capitalize">
        {user ? dictionary["myAccount"] : dictionary["welcomeGreeting"]}
      </h1>

      {user ? (
        <>
          <AccountInfo user={user.data} />
          <AddressComponent />
          <PaymentCards />
        </>
      ) : (
        <div className="flex flex-col space-x-4 mt-6 gap-4">
          {dictionary["freshNeedsMessage"]}
          <button
            onClick={() => setIsAddNumberOpen(true)}
            className="px-6 py-3 bg-primary text-white max-w-xs font-semibold rounded hover:bg-primary-dark"
          >
            {dictionary["loginOrRegister"]}
          </button>
        </div>
      )}

      <AddNumberDialog
        isOpen={isAddNumberOpen}
        onClose={() => setIsAddNumberOpen(false)}
      />
    </section>
  );
}

export default SettingsPage;
