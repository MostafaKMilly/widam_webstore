/**
 * This code was optimized and updated to use real data from the store
 * and replaced the profile image with a Lucide React person icon.
 */
import useUserStore from "@/lib/store/userStore";
import { User } from "lucide-react";
import React from "react";

interface AccountInfoItemProps {
  label: string;
  value: string;
}

const AccountInfoItem: React.FC<AccountInfoItemProps> = ({ label, value }) => (
  <div className="flex flex-col">
    <span className="text-xl text-black">{label}</span>
    <span className="mt-1.5 text-lg font-medium text-neutral-500">{value}</span>
  </div>
);

const AccountInfo: React.FC = () => {
  const user = useUserStore((state) => state.user);

  if (!user) {
    return (
      <section className="flex justify-center items-center p-6 bg-white rounded border border-gray-200 shadow-sm">
        <span className="text-gray-500">No user data available.</span>
      </section>
    );
  }

  return (
    <section
      className="flex flex-col p-5 mt-6 w-full bg-white rounded border border-gray-200 shadow-sm max-md:p-4"
      style={{
        border: "1px solid #ECECEC",
        boxShadow: "2px 2px 2.5px 0px rgba(0, 0, 0, 0.16)",
      }}
    >
      {/* Profile Section */}
      <div className="flex items-center gap-3 text-2xl font-semibold text-black">
        <div className="flex items-center justify-center bg-[#03ADEB] rounded-full h-14 w-14">
          <User className="text-white w-6 h-6" />
        </div>
        <div className="flex-1">
          <span className="capitalize">{user.profile_details.first_name}</span>{" "}
          {user.profile_details.last_name}
        </div>
      </div>

      {/* Account Information */}
      <div className="flex flex-wrap gap-8 py-4 px-4 mt-8 bg-neutral-100 rounded shadow-inner max-md:flex-col max-md:mt-6">
        <AccountInfoItem label="Email Address" value={user.email} />
        <div className="flex items-start gap-5">
          <div className="w-0.5 bg-sky-200 self-start h-12" />
          <AccountInfoItem
            label="Mobile Number"
            value={"+971 " + user.mobile_no}
          />
        </div>
        <div className="flex items-start gap-5">
          <div className="w-0.5 bg-sky-200 self-start h-12" />
          <AccountInfoItem
            label="Title"
            value={user.profile_details.customer_details.salutation}
          />
        </div>
      </div>
    </section>
  );
};

export default AccountInfo;
