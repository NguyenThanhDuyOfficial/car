import { Order } from "@/types/order.type"
import { apiClient } from "./axios.config"

export class OrderService {
  private static readonly ENDPOINT = "/orders"

  static async createtOrder(params?: Order) {
    const response = await apiClient.post(this.ENDPOINT, { userId: params?.userId, carId: params?.carId, dropoffTime: params?.dropoffTime, pickupTime: params?.pickupTime, status: params?.status, totalAmount: params?.totalAmount, dailyPrice: params?.dailyPrice, carInsurance: 0, renterInsurance: 0 })
    return response.data
  }
}
