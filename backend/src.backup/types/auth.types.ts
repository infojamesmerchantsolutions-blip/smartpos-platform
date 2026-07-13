export interface JwtPayload {

  id: string;

  merchantId?: string;

  email: string;

  role: string;

}

export interface LoginRequest {

  email: string;

  password: string;

}

export interface RegisterRequest {

  firstName: string;

  lastName: string;

  email: string;

  password: string;

  merchantId?: string;

}

export interface AuthResponse {

  accessToken: string;

  refreshToken: string;

}
