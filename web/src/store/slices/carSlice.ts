import { CarsState } from "@/types/car.type";
import { createSlice } from "@reduxjs/toolkit";
import { Car } from "lucide-react";


const initialState: CarsState = {
  cars: []
}
const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {}
})
export const { } = carsSlice.actions
export default carsSlice.reducer
