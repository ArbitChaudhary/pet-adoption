import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const api = axios.create({
  baseURL: BASE_URL as string,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.response.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    config.headers["Authorizaton"] = `Bearer ${token}}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
