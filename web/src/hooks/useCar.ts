import { CarService } from "@/services/api/car.service";
import { Car, CarQueryParams, CarsResponse } from "@/types/car.type";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCar, setCars } from "@/store/slices/carSlice";
import { IRootState } from "@/store";
import { addDays, differenceInDays } from "date-fns";
import { DateRange } from "react-day-picker";

export function useCars() {
  const dispatch = useDispatch()
  const carsState = useSelector((state: IRootState) => state.car)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [meta, setMeta] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1
  })

  const [pickupTime, setPickupTime] = useState<string>("07:00")
  const [dropoffTime, setDropoffTime] = useState<string>("7:00")

  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(new Date().setDate(new Date().getDate() + 1)),
    to: addDays(new Date(), 3),
  })
  const daysCount = dateRange?.from && dateRange?.to ? differenceInDays(dateRange.to, dateRange.from) : 0

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
        dispatch(setCar(response))
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
    pickupTime,
    setPickupTime,
    dropoffTime,
    setDropoffTime,
    dateRange,
    daysCount,
    setDateRange,
    getCars,
    error,
    meta,
    getCarById,
    car: carsState.car,
  }
}
