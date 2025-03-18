import { post, get } from "../utils/request";

export const createOrder = async (data) => {
  const response = await post("orders", data);
  return response;
};

export const getOrderByUser = async (userId) => {
  const response = await get(`orders/user/${userId}`, data);
  return response;
};

export const getOrderById = async (id) => {
  const response = await get(`orders/${id}`);
  return response;
};
