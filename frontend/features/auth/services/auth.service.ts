import { api } from "@/lib/api/client";
import type {
  LoginRequest,
  LoginResponse,
} from "@/types/auth";

export const authService = {
  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>(
      "/auth/login",
      data
    );

    return response.data;
  },

  async me() {
    const response = await api.get("/auth/me");

    return response.data;
  },
};