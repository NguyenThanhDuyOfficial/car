import { CarQueryParams, CarsResponse } from "@/types/car.type"
import { apiClient } from "./axios.config"

export class CarService {
  private static readonly ENDPOINT = "/cars"

  static async getCars(params?: CarQueryParams): Promise<CarsResponse> {
    try {

      const response = await apiClient.get<CarsResponse>(this.ENDPOINT, { params })
      console.log("soemthing", response)
      return response.data
    } catch (error) { console.log(error) }

    const response = await apiClient.get<CarsResponse>(this.ENDPOINT, { params })
    console.log("soemthing", response)
    return response.data
  }

}
