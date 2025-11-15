import axios, { type AxiosResponse, type InternalAxiosRequestConfig } from "axios";

import { env } from "@/config/env";
import { useAuthStore } from "@/stores/auth-store";

export const api = axios.create({
  baseURL: env.API_URL,
});

// Request interceptor: Menambahkan token ke setiap request
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers = config.headers ?? {};
      config.headers["Authorization"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor: Handle response dan error
api.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error) => {
    // Handle 401 Unauthorized - Token tidak valid atau expired
    if (error.response?.status === 401) {
      const resetAuth = useAuthStore.getState().resetAuth;
      resetAuth();
      // Redirect ke halaman login jika token tidak valid
      if (window.location.pathname !== "/") {
        window.location.href = "/";
      }
    }
    return Promise.reject(error);
  }
);

// bagi yang butuh response header
export const apiRaw = axios.create({
  baseURL: env.API_URL,
});

apiRaw.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers = config.headers ?? {};
      config.headers["Authorization"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiRaw.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    // Handle 401 Unauthorized - Token tidak valid atau expired
    if (error.response?.status === 401) {
      const resetAuth = useAuthStore.getState().resetAuth;
      resetAuth();
      // Redirect ke halaman login jika token tidak valid
      if (window.location.pathname !== "/") {
        window.location.href = "/";
      }
    }
    return Promise.reject(error);
  }
);
