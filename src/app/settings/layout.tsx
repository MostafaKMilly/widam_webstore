import SettingLayout from "@/components/MyAccountComponents/MyAccount";
import React from "react";

function Layout(props: { children: React.ReactNode }) {
  return <SettingLayout>{props.children}</SettingLayout>;
}

export default Layout;
