import { CarFeature } from "./carFeature.type";
import { CarStatus, FuelType, Transmission } from "./enum";
import { Order } from "./order.type";
import { Review } from "./review.type";
import { Image } from "./image.type"

export interface CarState {
  cars: Car[]
}
export interface Car {
  id: string;
  ownerId: string;
  title: string;
  description?: string | null;
  licensePlate?: string | null;
  brand?: string | null;
  model?: string | null;
  seatCount: number;
  transmission: Transmission;
  fuelType: FuelType;
  status: CarStatus;
  pickupLocation: string;
  dailyPrice: number;
  createdAt: Date;
  updatedAt: Date;

  carFeatures?: CarFeature[];
  images?: Image[];
  orders?: Order[];
  reviews?: Review[];
  owner?: {
    id: string;
    firstName?: string | null;
    lastName?: string | null;
    email: string;
    avatarUrl?: string | null;
  };
}
