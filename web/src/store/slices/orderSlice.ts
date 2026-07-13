import { User } from "@/types/auth.type"
import { Car } from "@/types/car.type"
import { createSlice } from "@reduxjs/toolkit"

export interface OrderState {
  order?: {
    id?: string,
    totalAmount?: number,
    user?: User,
    car?: Car,
    pickupDate?: Date,
    dropoffDate?: Date,
    pickupTime?: string,
    dropoffTime?: string,
  }
}

const initialState: OrderState = {
}

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {

    setOrder(state, action) {
      state.order = action.payload
    },
  }
})

export const { setOrder } = orderSlice.actions
export default orderSlice.reducer
