import { CarFeature } from "./carFeature.type";
import { CarStatus, FuelType, Transmission } from "./enum";
import { Order } from "./order.type";
import { Review } from "./review.type";
import { Image } from "./image.type"
import { inter } from "@/app/fonts";

export interface CarsState {
  cars: Car[]
}
export interface Car {
  id: string;
  ownerId: string;
  title: string;
  description: string | null;
  licensePlate: string | null;
  brand: string | null;
  model: string | null;
  seatCount: number;
  imageUrl: string;
  transmission: Transmission;
  fuelType: FuelType;
  status: CarStatus;
  pickupLocation: string;
  dailyPrice: number;
  createdAt: Date;
  updatedAt: Date;
  owner: {
    email: string;
    firstName: string;
    lastName: string;
  };
}
export interface CarQueryParams {
  page?: number,
  limit?: number,
}
export interface PaginationMeta {
  total: number,
  page: number,
  limit: number,
  totalPages: number
}
export interface CarsResponse {
  data: Car[];
  meta: PaginationMeta
}
