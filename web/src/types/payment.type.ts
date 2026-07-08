import { PaymentStatus } from "./enum";

export type Payment = {
  id: string;
  userId: string;
  orderId: string;
  paymentMethod: string | null;
  amount: number;
  transactionId: string | null;
  status: PaymentStatus;
  paymentDate: string | null;
  createdAt: string;
  updatedAt: string;
}
