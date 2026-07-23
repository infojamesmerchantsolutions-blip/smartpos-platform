export interface User {
  id: string;
  email: string;
  name?: string | null;
  role?: string | null;
  merchantId?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}
