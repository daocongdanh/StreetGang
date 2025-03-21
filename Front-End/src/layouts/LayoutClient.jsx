import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Outlet } from "react-router";
import { MessageProvider } from "../contexts/MessageContext";
import { CartProvider } from "../contexts/CartContext";

const LayoutClient = () => {
  return (
    <MessageProvider>
      <CartProvider>
        <Header />
        <div className="bg-[#FAFAFA]">
          <div className="w-[1192px] mx-auto">
            <Outlet />
          </div>
        </div>
        <Footer />
      </CartProvider>
    </MessageProvider>
  );
};
export default LayoutClient;
