import { get, post, put, del } from "../utils/request";

export const addToCart = async (data) => {
  const response = await post("carts", data);
  return response;
};

export const updateCart = async (productId, data) => {
  const response = await put(`carts/cart-item/${productId}`, data);
  return response;
};

export const deleteCart = async (userId, productId) => {
  const response = await del(`carts/cart-item/${userId}/${productId}`);
  return response;
};

export const getCartByUser = async (userId) => {
  const response = await get(`carts/user/${userId}`);
  return response;
};
