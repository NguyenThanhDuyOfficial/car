import { Role } from "./enum";
export type User = {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  avatarUrl: string | null;
  isActive: boolean;
  role: Role;
  createdAt: string;
  updatedAt: string;
}
