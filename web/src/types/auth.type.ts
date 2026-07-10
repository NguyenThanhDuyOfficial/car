export interface User {
  id: string,
  email: string,
  name?: string,
  role?: string
}

export interface LoginParams {
  email: string,
  password: string
}

export interface RegisterParams {
  email: string,
  password: string
}

export interface AuthResponse {
  accessToken: string,
  refreshToken: string,
  user: {
    id: string,
    email: string,
    firstName: string,
    lastName: string,
    role: string
  }
}
export interface ErrorResponse {
  message: string,
  error: string,
  statusCode: number
}
