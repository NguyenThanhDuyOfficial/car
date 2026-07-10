import { Car, CarQueryParams, CarsResponse } from "@/types/car.type"
import { apiClient } from "./axios.config"

export class CarService {
  private static readonly ENDPOINT = "/cars"

  static async getCars(params?: CarQueryParams): Promise<CarsResponse> {
    const response = await apiClient.get<CarsResponse>(this.ENDPOINT, { params })
    return response.data
  }

  static async getCarById(id: string): Promise<Car> {
    const response = await apiClient.get<Car>(`${this.ENDPOINT}/${id}`)
    return response.data
  }

  static async getOwnerById(id: string) {
    const response = await apiClient.get(`/users/${id}`)
    return response.data
  }
}
