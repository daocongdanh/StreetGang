import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Outlet } from "react-router";
import { MessageProvider } from "../contexts/MessageContext";

const LayoutClient = () => {
  return (
    <MessageProvider>
      <Header />
      <div className="bg-[#FAFAFA]">
        <div className="w-[1192px] mx-auto">
          <Outlet />
        </div>
      </div>
      <Footer />
    </MessageProvider>
  );
};
export default LayoutClient;
