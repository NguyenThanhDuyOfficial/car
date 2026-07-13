import { OrderStatus } from "./enum";

export type Order = {
  id?: string;
  userId: string;
  carId: string;
  pickupTime: Date;
  dropoffTime: Date;
  actualPickupTime?: Date | null;
  actualDropoffTime?: Date | null;
  dailyPrice?: number | null;
  carInsurance?: number | null;
  renterInsurance?: number | null;
  overLimitFee?: number | null;
  overTimeFee?: number | null;
  cleaningFee?: number | null;
  deodorizingFee?: number | null;
  totalAmount: number;
  status: OrderStatus;
  driverNotes?: string | null;
  customerNotes?: string | null;
  cancellationReason?: string | null;
  createdAt?: string;
  updatedAt?: string;
}
