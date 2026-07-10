import { CarsState } from "@/types/car.type";
import { createSlice } from "@reduxjs/toolkit";


const initialState: CarsState = {
  cars: []
}
const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {

    setCars(state, action) {
      state.cars = action.payload
    },
  }
})
export const { setCars } = carsSlice.actions
export default carsSlice.reducer
