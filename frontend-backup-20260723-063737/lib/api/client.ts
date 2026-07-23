import axios from "axios";

import { useAuthStore } from "@/store/auth.store";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:3000/api/v1";

console.log("API URL:", API_URL);

export const api = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  console.log("REQUEST:", `${config.baseURL}${config.url}`);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});