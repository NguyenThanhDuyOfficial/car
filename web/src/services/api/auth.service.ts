import { AuthResponse, ErrorResponse, LoginParams, RegisterParams } from "@/types/auth.type"
import { apiClient } from "./axios.config"

export const AuthService = {
  login: async (params: LoginParams): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/login', params)
    return response.data
  },
  register: async (params: RegisterParams): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/register', params)
    return response.data
  },
  logout: async (): Promise<void> => {
    try {
      await apiClient.post("/auth/logout")
    } catch (error) {
      console.log("Logout failed:", error)
    }
  },
  refreshToken: async (refreshToken: string): Promise<string | null> => {
    if (!refreshToken) return null
    try {
      const response = await apiClient.post<{ accessToken: string }>('/auth/refresh', { refreshToken })
      const { accessToken } = response.data
      return accessToken
    } catch (error) {
      console.log("Token refresh failed: ", error)
      return null
    }
  }
}
