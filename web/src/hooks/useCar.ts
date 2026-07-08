import { IRootState } from "@/store";
import { Car } from "@/types/car.type";
import { useSelector } from "react-redux";

export function useCar() {
  const reduxCar = useSelector((state: IRootState) => state.car)
  const cars: Car[] = reduxCar.cars

  return {
    cars,
  }
}
