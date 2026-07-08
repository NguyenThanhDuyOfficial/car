export enum Role {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  HOST = 'HOST',
  USER = 'USER',
}

export enum Transmission {
  AUTOMATIC = 'AUTOMATIC',
  MANUAL = 'MANUAL',
}

export enum FuelType {
  GASOLINE = 'GASOLINE',
  DIESEL = 'DIESEL',
  ELECTRIC = 'ELECTRIC',
}

export enum CarStatus {
  AVAILABLE = 'AVAILABLE',
  BOOKED = 'BOOKED',
}

export enum OrderStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED',
  COMPLETED = 'COMPLETED',
  ACTIVE = 'ACTIVE',
  PROCESSING = 'PROCESSING',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
}
