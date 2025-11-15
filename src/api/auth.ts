import { useMutation } from "@tanstack/react-query";
import { api } from "@/libs/api";
import { useAuthStore } from "@/stores/auth-store";
import type { IAuthProps } from "@/sso/types/auth";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  meta: {
    message: string;
    code: number;
    status: string;
  };
  data: {
    id: string;
    name: string;
    email: string;
    phone: string;
    token: string;
  };
}

const loginApi = (data: LoginRequest): Promise<LoginResponse> => {
  return api.post("/users/login", data);
};

type UseLoginOptions = {
  onSuccess?: (response: LoginResponse) => void;
  onError?: (error: Error) => void;
  redirectTo?: string;
};

export const useLogin = ({ 
  onSuccess, 
  onError, 
  redirectTo = "/dashboard" 
}: UseLoginOptions = {}) => {
  const setAuthUser = useAuthStore((state) => state.setAuthUser);

  return useMutation({
    mutationFn: loginApi,
    onSuccess: (response) => {
      if (response.data?.token) {
        // Map response data ke IAuthProps
        const userData: IAuthProps = {
          userId: response.data.id,
          fullname: response.data.name,
          email: response.data.email,
          isActive: true,
          isSuperAdmin: true, // Default true untuk admin
          avatarPath: "", // Default empty
          permissions: [], // Default empty array, bisa diisi dari API lain jika diperlukan
          isFirstLogin: false,
          hasLoggedInBefore: true,
        };

        // Simpan ke auth store (otomatis tersimpan ke localStorage via persist middleware)
        setAuthUser(userData, response.data.token);
        
        // Redirect ke halaman yang ditentukan
        if (redirectTo) {
          window.location.href = redirectTo;
        }

        // Call custom onSuccess jika ada
        onSuccess?.(response);
      }
    },
    onError: (error) => {
      console.error("Login error:", error);
      onError?.(error);
    },
  });
};

