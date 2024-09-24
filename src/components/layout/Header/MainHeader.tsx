// components/layout/Header/MainHeader.tsx
import React from "react";
import Header from "./Header";
import Navigation from "../Navigation/Navigation";

function MainHeader() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
      <Header />
      <Navigation />
    </header>
  );
}

export default MainHeader;
