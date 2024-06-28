import axios from "axios";
import Cookies from "js-cookie";
import { API } from "./config";

const api = axios.create({
  baseURL: API,
});

export const getToken = () => {
  return Cookies.get("access_token");
};

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
