import { api } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";

import type {
  LoginRequest,
  LoginResponse,
} from "@/types/auth";

interface ApiResponse {
  success: boolean;
  data: LoginResponse;
}

export async function login(
  payload: LoginRequest
): Promise<LoginResponse> {
  const response =
    await api.post<ApiResponse>(
      ENDPOINTS.auth.login,
      payload
    );

  return response.data.data;
}