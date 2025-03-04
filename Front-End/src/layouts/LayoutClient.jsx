import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Outlet } from "react-router";

const LayoutClient = () => {
  return (
    <div>
      <Header />
      <div className="bg-[#FAFAFA]">
        <div className="w-[1192px] mx-auto">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default LayoutClient;
