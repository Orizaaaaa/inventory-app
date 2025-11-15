import axios, { type AxiosResponse } from "axios";


import { env } from "@/config/env";
import { useAuthStore } from "@/stores/auth-store";

export const api = axios.create({
  baseURL: env.API_URL,
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers = config.headers ?? {};
    config.headers["X-USER-JWT"] = token;
  }
  return config;
});

api.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error) => {
    return Promise.reject(error);
  }
);

// bagi yang butuh response header
export const apiRaw = axios.create({
  baseURL: env.API_URL,
});

apiRaw.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers = config.headers ?? {};
    config.headers["X-USER-JWT"] = token;
  }
  return config;
});
