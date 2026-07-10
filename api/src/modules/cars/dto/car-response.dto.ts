import { ApiProcessingResponse, ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { CarStatus, FuelType, Transmission } from "src/generated/prisma/enums";

export class OwnerDto {
  @ApiProperty({ description: 'Owner email', example: 'owner@gmail.com' })
  @Expose()
  email!: string;

  @ApiProperty({ description: 'Owner first name', example: 'John' })
  @Expose()
  firstName!: string;

  @ApiProperty({ description: 'Owner last name', example: 'Doe' })
  @Expose()
  lastName!: string;
}

export class CarResponseDto {
  @ApiProperty({
    description: "Car image url",
    example: "https://images.unsplash.com/imageurl"
  })
  @Expose()
  imageUrl?: string | null

  @ApiProperty({ description: 'Car unique identifier', example: '550e8400-e29b-41d4-a716-446655440000' })
  @Expose()
  id!: string;

  @ApiProperty({ description: 'Car title', example: 'Honda Civic E 2018' })
  @Expose()
  title!: string;

  @ApiProperty({ description: 'Car description', example: 'Well-maintained Honda Civic' })
  @Expose()
  description?: string | null;

  @ApiProperty({ description: 'License plate number', example: '51A-12345' })
  @Expose()
  licensePlate?: string | null;

  @ApiProperty({ description: 'Car brand', example: 'Honda' })
  @Expose()
  brand?: string | null;

  @ApiProperty({ description: 'Car model', example: 'Civic E 2018' })
  @Expose()
  model?: string | null;

  @ApiProperty({ description: 'Number of seats', example: 5 })
  @Expose()
  seatCount!: number;

  @ApiProperty({ description: 'Transmission type', enum: Transmission })
  @Expose()
  transmission!: Transmission;

  @ApiProperty({ description: 'Fuel type', enum: FuelType })
  @Expose()
  fuelType!: FuelType;

  @ApiProperty({ description: 'Pickup location', example: '123 Nguyen Hue, District 1, HCMC' })
  @Expose()
  pickupLocation!: string;

  @ApiProperty({ description: 'Daily rental price in VND', example: 850000 })
  @Expose()
  dailyPrice!: number;

  @ApiProperty({ description: 'Car status', enum: CarStatus })
  @Expose()
  status!: CarStatus;

  @ApiProperty({ description: 'Owner ID', example: '550e8400-e29b-41d4-a716-446655440000' })
  @Expose()
  ownerId!: string;

  @ApiProperty({ description: 'Creation timestamp', example: '2026-07-03T10:00:00Z' })
  @Expose()
  createdAt!: Date;

  @ApiProperty({ description: 'Last update timestamp', example: '2026-07-03T10:00:00Z' })
  @Expose()
  updatedAt!: Date;

  @ApiProperty({
    description: 'Owner information',
    type: OwnerDto
  })
  @Expose()
  owner?: OwnerDto;
}
