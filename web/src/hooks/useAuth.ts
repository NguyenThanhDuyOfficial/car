import { IRootState } from "@/store";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoginParams, RegisterParams, AuthResponse, User, ErrorResponse } from "@/types/auth.type";
import { AuthService } from "@/services/api/auth.service";
import { Parasol } from "lucide-react";
import { setAccessToken, setUser } from "@/store/slices/authSlice";

export function useAuth() {
  const dispatch = useDispatch()
  const authState = useSelector((state: IRootState) => state.auth)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const login = useCallback(
    async (params: LoginParams): Promise<AuthResponse | null> => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await AuthService.login(params)
        dispatch(setUser(response.user))
        dispatch(setAccessToken(response.accessToken))

        return response
      } catch (error: any) {
        if (error.response) {
          const message = "Login failed: " + error.response.data?.message || "Login failed" + error
          setError(message)
        }
        return null
      } finally {
        setIsLoading(false)
      }
    }, [])
  const register = useCallback(
    async (params: RegisterParams): Promise<AuthResponse | null> => {

      setIsLoading(true)
      setError(null)

      try {
        const response = await AuthService.register(params)
        dispatch(setUser(response.user))
        dispatch(setAccessToken(response.accessToken))

        return response
      } catch (error: any) {
        if (error.response) {
          const message = "Login failed: " + error.response.data?.message || "Login failed" + error
          setError(message)
        }
        return null
      } finally {
        setIsLoading(false)
      }
    }, [])
  return {
    user: authState.user,
    isAuthenticated: authState.isAuthenticated,
    isLoading,
    error,
    login,
    register,
  }
}
