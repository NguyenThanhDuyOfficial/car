import { CarService } from "@/services/api/car.service";
import { Car, CarQueryParams, CarsResponse } from "@/types/car.type";
import { useCallback, useState } from "react";

export function useCars() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [cars, setCars] = useState<Car[]>([])
  const [meta, setMeta] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1
  })


  const getCars = useCallback(
    async (params?: CarQueryParams): Promise<CarsResponse | null> => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await CarService.getCars(params)
        setCars(response.data)
        setMeta(response.meta)
        return response
      } catch (error) {
        const message = 'Failed to load cars:' + error
        setError(message)
        return null
      } finally {
        setIsLoading(false)
      }

    }, [])

  return {
    isLoading,
    cars,
    getCars,
    error,
    meta
  }
}
