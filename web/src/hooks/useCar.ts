import { CarService } from "@/services/api/car.service";
import { Car, CarQueryParams, CarsResponse } from "@/types/car.type";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCars } from "@/store/slices/carSlice";
import { IRootState } from "@/store";

export function useCars() {
  const dispatch = useDispatch()
  const carsState = useSelector((state: IRootState) => state.car)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [car, setCar] = useState<Car>()
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
        dispatch(setCars(response.data))
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

  const getCarById = useCallback(
    async (id: string): Promise<Car | null> => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await CarService.getCarById(id)
        setCar(response)
        return response
      } catch (error) {
        const message = `Failed to fetch car: ${id} ` + error
        setError(message)
        return null
      } finally {
        setIsLoading(false)
      }
    }, [])
  return {
    isLoading,
    cars: carsState.cars,
    getCars,
    error,
    meta,
    getCarById,
    car,
  }
}
