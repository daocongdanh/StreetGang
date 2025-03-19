import { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Outlet } from "react-router";
import { MessageProvider } from "../contexts/MessageContext";
import { getCartByUser } from "../services/cartService";

const LayoutClient = () => {
  const [cartCount, setCartCount] = useState(0);
  const fetchCartCount = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem("user")).userId;
      if (!userId) return;
      const response = await getCartByUser(userId);
      const count = response.data.items.length;
      setCartCount(count);
      localStorage.setItem("cartCount", JSON.stringify(count));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCartCount();
  }, []);

  return (
    <MessageProvider>
      <Header cartCount={cartCount} />
      <div className="bg-[#FAFAFA]">
        <div className="w-[1192px] mx-auto">
          <Outlet context={{ fetchCartCount }} />
        </div>
      </div>
      <Footer />
    </MessageProvider>
  );
};
export default LayoutClient;
