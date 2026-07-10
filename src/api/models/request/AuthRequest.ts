export interface LoginRequest {
  email: string;
  password: string;
  deviceType: string;
  deviceToken?: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  deviceType: string;
}

export interface ForgotPasswordRequest {
  email: string;
}
