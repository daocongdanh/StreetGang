import { get } from "../utils/request";

export const getBlogs = async (page) => {
  const response = await get(`blogs?page=${page}`);
  return response;
};
