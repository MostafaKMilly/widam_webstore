"use client";
import AccountInfo from "@/components/MyAccountComponents/AccountInfo";
import DefaultAddress from "@/components/MyAccountComponents/DefaultAddress";
import MyAccount from "@/components/MyAccountComponents/MyAccount";
import PaymentCards from "@/components/MyAccountComponents/PaymentCards";
import React from "react";

function SettingsPage() {
  return (
    <section className="flex flex-col ml-5 w-9/12 max-md:ml-0 max-md:w-full">
      <h1 className="self-start text-2xl font-medium text-sky-900 capitalize">
        <span className="text-sky-900 capitalize">M</span>y Account
      </h1>
      <AccountInfo />
      <DefaultAddress />
      <PaymentCards />
    </section>
  );
}

export default SettingsPage;
