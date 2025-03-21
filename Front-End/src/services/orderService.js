import { post, get } from "../utils/request";

export const createOrder = async (data) => {
  const response = await post("orders", data);
  return response;
};

export const getOrderByUser = async (userId, page) => {
  const response = await get(`orders/user/${userId}?page=${page}`);
  return response;
};

export const getOrderById = async (id) => {
  const response = await get(`orders/${id}`);
  return response;
};
