import { get } from "../utils/request";

export const getBlogs = async () => {
  const response = await get(`blogs`);
  return response;
};
