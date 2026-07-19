import { api } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";

import type {
  LoginRequest,
  LoginResponse,
} from "@/types/auth";

export async function login(
  payload: LoginRequest
): Promise<LoginResponse> {

  const { data } =
    await api.post<LoginResponse>(
      ENDPOINTS.AUTH.LOGIN,
      payload
    );

  return data;
}