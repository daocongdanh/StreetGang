import { createContext, useContext, useState, useEffect } from "react";
import {
  deleteCart,
  getCartByUser,
  updateCart,
  addToCart,
} from "../services/cartService";

const CartContext = createContext();
export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const userId = JSON.parse(localStorage.getItem("user"))?.userId;
  const [cart, setCart] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCart = async () => {
    try {
      const cartResponse = await getCartByUser(userId);
      setCart(cartResponse.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCart();
  }, [userId]);

  const addCart = async (data) => {
    try {
      setIsLoading(true);
      const cartResponse = await addToCart(data);
      setCart(cartResponse.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (quantity, productId) => {
    try {
      const cartResponse = await updateCart(productId, { quantity, userId });
      setCart(cartResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  const removeCart = async (productId) => {
    try {
      const cartResponse = await deleteCart(userId, productId);
      setCart(cartResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  const totalItem = () => {
    return cart
      ? cart.items.reduce((total, item) => total + item.quantity, 0)
      : 0;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addCart,
        updateQuantity,
        removeCart,
        totalItem,
        isLoading,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
