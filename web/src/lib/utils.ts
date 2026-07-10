import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function formatPrice(price: number): string {
  if (price >= 1000) {
    return (price / 1000).toFixed(0) + 'k'
  }
  return price.toString()
}
