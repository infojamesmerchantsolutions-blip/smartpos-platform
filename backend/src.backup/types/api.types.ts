export interface HealthResponse {

  status: string;

  timestamp: Date;

  version: string;

}

export interface ErrorResponse {

  success: false;

  message: string;

  error?: unknown;

}

export interface SuccessResponse {

  success: true;

  message: string;

}
