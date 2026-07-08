export type Review = {
  id: string;
  userId: string;
  carId: string;
  title: string;
  rating: number;
  comment: string | null;
  createdAt: string;
}
