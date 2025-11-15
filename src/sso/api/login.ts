import { useMutation } from "@tanstack/react-query";
import type { MutationConfig } from "@/libs/react-query";
import { api } from "@/libs/api";

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
  mutationConfig?: MutationConfig<typeof loginApi>;
};

export const useLogin = ({ mutationConfig }: UseLoginOptions = {}) => {
  return useMutation({
    ...mutationConfig,
    mutationFn: loginApi,
  });
};

