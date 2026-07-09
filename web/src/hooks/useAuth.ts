import { IRootState } from "@/store";
import { useState } from "react";
import { useSelector } from "react-redux";

export function useAuth() {
  const authState = useSelector((state: IRootState) => state.auth)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  return {
    user: authState.user,
    isAuthenticated: authState.isAuthenticated,
    isLoading,
    error
  }
}
