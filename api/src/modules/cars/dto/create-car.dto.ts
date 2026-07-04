import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Prisma } from "@prisma/client/extension";
import { Decimal } from "@prisma/client/runtime/client";
import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, Min, ValidateIf } from "class-validator";
import { CarStatus, FuelType, Transmission } from "src/generated/prisma/enums";

export class CreateCarDto {
  // ===== REQUIRED FIELDS =====

  @ApiProperty({
    description: 'Car title',
    example: 'Honda Civic E 2018',
    maxLength: 200,
  })
  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  @MaxLength(200, { message: 'Title must not exceed 200 characters' })
  title!: string;

  @ApiProperty({
    description: 'Owner ID (user who owns the car)',
    example: 'cmr3l5jgw0000qnbq939xdrwc',
  })
  @IsNotEmpty({ message: 'Owner ID is required' })
  ownerId!: string;

  @ApiProperty({
    description: 'Number of seats',
    example: 5,
    minimum: 1,
    maximum: 50,
    default: 4,
  })
  @IsNumber()
  @IsNotEmpty({ message: 'Seat count is required' })
  @Min(1, { message: 'Seat count must be at least 1' })
  seatCount!: number;

  @ApiProperty({
    description: 'Transmission type',
    enum: Transmission,
    example: 'AUTOMATIC',
  })
  @IsEnum(Transmission, {
    message: 'Transmission must be MANUAL or AUTOMATIC',
  })
  @IsNotEmpty({ message: 'Transmission is required' })
  transmission!: Transmission;

  @ApiProperty({
    description: 'Fuel type',
    enum: FuelType,
    example: 'GASOLINE',
  })
  @IsEnum(FuelType, {
    message: 'Fuel type must be GASOLINE, DIESEL, ELECTRIC, or HYBRID',
  })
  @IsNotEmpty({ message: 'Fuel type is required' })
  fuelType!: FuelType;

  @ApiProperty({
    description: 'Pickup location (address where car is parked)',
    example: '123 Nguyen Hue, District 1, Ho Chi Minh City',
    maxLength: 500,
  })
  @IsString()
  @IsNotEmpty({ message: 'Pickup location is required' })
  @MaxLength(500, { message: 'Pickup location must not exceed 500 characters' })
  pickupLocation!: string;

  @ApiProperty({
    description: 'Daily rental price in VND',
    example: 850000,
    minimum: 0,
  })
  @IsNumber()
  @IsNotEmpty({ message: 'Daily price is required' })
  @Min(0, { message: 'Daily price must be greater than or equal to 0' })
  dailyPrice!: number;

  // ===== OPTIONAL FIELDS =====

  @ApiPropertyOptional({
    description: 'Detailed description of the car',
    example: 'Well-maintained Honda Civic, great for city driving',
    maxLength: 2000,
  })
  @IsOptional()
  @IsString()
  @MaxLength(2000, { message: 'Description must not exceed 2000 characters' })
  description?: string;

  @ApiPropertyOptional({
    description: 'License plate number',
    example: '51A-12345',
    maxLength: 20,
  })
  @IsOptional()
  @IsString()
  @MaxLength(20, { message: 'License plate must not exceed 20 characters' })
  licensePlate?: string;

  @ApiPropertyOptional({
    description: 'Car brand',
    example: 'Honda',
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100, { message: 'Brand must not exceed 100 characters' })
  brand?: string;

  @ApiPropertyOptional({
    description: 'Car model',
    example: 'Civic E 2018',
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100, { message: 'Model must not exceed 100 characters' })
  model?: string;

  @ApiPropertyOptional({
    description: 'Car status',
    enum: CarStatus,
    default: 'AVAILABLE',
    example: 'AVAILABLE',
  })
  @IsOptional()
  @IsEnum(CarStatus, {
    message: 'Status must be AVAILABLE, RENTED, MAINTENANCE, or UNAVAILABLE',
  })
  status?: CarStatus = CarStatus.AVAILABLE;

  // ===== VALIDATION HELPERS =====


  /**
   * Validate that if license plate is provided, it follows format
   */
}
