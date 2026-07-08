import { CarState } from "@/types/car.type";
import { createSlice } from "@reduxjs/toolkit";
import { Car } from "lucide-react";


const initialState: CarState = {
  cars: []
}
const carSlice = createSlice({

  name: 'car',
  initialState,
  reducers: {}
})
export const { } = carSlice.actions
export default carSlice.reducer
