import { get, post, put, del } from "../utils/request";

export const register = async (data) => {
  const response = await post(`users/register`, data);
  return response;
};

export const login = async (data) => {
  const response = await post(`users/login`, data);
  return response;
};

export const getUserById = async (id) => {
  const response = await get(`users/${id}`);
  return response;
};

export const updateUser = async (id, data) => {
  const response = await put(`users/${id}`, data);
  return response;
};

export const addNewAddress = async (data) => {
  const response = await post("users/add-new-address-by-user", data);
  return response;
};

export const deleteAddress = async (userId, addressId) => {
  const response = await del(
    `users/delete-address-by-user/${userId}/address/${addressId}`
  );
  return response;
};

export const updateAddress = async (id, data) => {
  const response = await put(`users/update-address-by-user/${id}`, data);
  return response;
};
