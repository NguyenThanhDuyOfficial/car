import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";
import { CarStatus, FuelType, Transmission } from "src/generated/prisma/enums";

export class QueryCarDto {
  @ApiPropertyOptional({
    description: 'Filter by OwnerId',
    example: '23424er548-34598e'
  })
  @IsString()
  @IsOptional()
  ownerId?: string

  @ApiPropertyOptional({
    description: 'Search by title (partial match)',
    example: 'Toyota Camry'
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({
    description: 'Filter by brand',
    example: 'Toyota'
  })
  @IsString()
  @IsOptional()
  brand?: string;

  @ApiPropertyOptional({
    description: 'Filter by model',
    example: 'Camry'
  })
  @IsString()
  @IsOptional()
  model?: string;

  @ApiPropertyOptional({
    description: 'Filter by transmission type',
    enum: Transmission,
    example: Transmission.AUTOMATIC
  })
  @IsEnum(Transmission)
  @IsOptional()
  transmission?: Transmission;

  @ApiPropertyOptional({
    description: 'Filter by fuel type',
    enum: FuelType,
    example: FuelType.GASOLINE
  })
  @IsEnum(FuelType)
  @IsOptional()
  fuelType?: FuelType;

  @ApiPropertyOptional({
    description: 'Filter by status',
    enum: CarStatus,
    example: CarStatus.AVAILABLE
  })
  @IsEnum(CarStatus)
  @IsOptional()
  status?: CarStatus;

  @ApiPropertyOptional({
    description: 'Filter by pickup location (partial match)',
    example: 'Ho Chi Minh'
  })
  @IsString()
  @IsOptional()
  pickupLocation?: string;

  @ApiPropertyOptional({
    description: 'Minimum daily price',
    example: 500000
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  minPrice?: number;

  @ApiPropertyOptional({
    description: 'Maximum daily price',
    example: 2000000
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  maxPrice?: number;

  @ApiPropertyOptional({
    description: 'Minimum seat count',
    example: 4
  })
  @IsNumber()
  @Min(1)
  @IsOptional()
  minSeatCount?: number;

  @ApiPropertyOptional({
    description: 'Maximum seat count',
    example: 7
  })
  @IsNumber()
  @Min(1)
  @IsOptional()
  maxSeatCount?: number;

  @ApiPropertyOptional({
    description: 'Page number for pagination',
    example: 1,
    default: 1
  })
  @IsNumber()
  @Min(1)
  @IsOptional()
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Items per page',
    example: 10,
    default: 10
  })
  @IsNumber()
  @Min(1)
  @Max(100)
  @IsOptional()
  limit?: number = 10;

  @ApiPropertyOptional({
    description: 'Sort field',
    example: 'dailyPrice',
    enum: ['createdAt', 'dailyPrice', 'title', 'brand']
  })
  @IsString()
  @IsOptional()
  sortBy?: string = 'createdAt';

  @ApiPropertyOptional({
    description: 'Sort order',
    example: 'desc',
    enum: ['asc', 'desc']
  })
  @IsString()
  @IsOptional()
  sortOrder?: 'asc' | 'desc' = 'desc';
}
