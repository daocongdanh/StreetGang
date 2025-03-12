import axios from "axios";
const BASEURL = "http://localhost:8080/api/v1/";
export const axiosInstance = axios.create({
  baseURL: BASEURL,
  headers: {
    "Content-Type": "application/json",
  },
});
