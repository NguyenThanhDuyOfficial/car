import { OrderStatus } from "./enum";

export type Order = {
  id: string;
  userId: string;
  carId: string;
  pickupTime: string;
  dropoffTime: string;
  actualPickupTime: string | null;
  actualDropoffTime: string | null;
  dailyPrice: number;
  carInsurance: number;
  renterInsurance: number;
  overLimitFee: number | null;
  overTimeFee: number | null;
  cleaningFee: number | null;
  deodorizingFee: number | null;
  totalAmount: number;
  status: OrderStatus;
  driverNotes: string | null;
  customerNotes: string | null;
  cancellationReason: string | null;
  createdAt: string;
  updatedAt: string;
}
