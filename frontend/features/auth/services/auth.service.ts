import { api } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";

import type {
  LoginRequest,
  LoginResponse,
} from "@/types/auth";

export async function login(
  data: LoginRequest
): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>(
    ENDPOINTS.AUTH.LOGIN,
    data
  );

  return response.data;
}