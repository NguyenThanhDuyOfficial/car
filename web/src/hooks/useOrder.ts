import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "@/store";
import { useCallback, useState } from "react";
import { Order } from "@/types/order.type";
import { setOrder } from "@/store/slices/orderSlice";
import { OrderService } from "@/services/api/order.service";

export function useOrder() {
  const dispatch = useDispatch()
  const orderState = useSelector((state: IRootState) => state.order)

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [totalAmount, setTotalAmount] = useState<number>(0)

  const createOrder = useCallback(
    async (params?: Order) => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await OrderService.createtOrder(params)
        dispatch(setOrder(response))
        return response
      } catch (error: any) {
        const message = "Create order failed: " + error
        setError(error)
      } finally {
        setIsLoading(false)
      }
    }, []
  )
  return {
    order: orderState.order,
    createOrder,
    isLoading,
    error,
    setError,
    totalAmount,
    setTotalAmount
  }
}
