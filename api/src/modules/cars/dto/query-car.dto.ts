import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";
import { CarStatus, FuelType, Transmission } from "src/generated/prisma/enums";

export class QueryCarDto {
  @ApiPropertyOptional({
    description: 'Filter by OwnerId',
  })
  @IsString()
  @IsOptional()
  ownerId?: string

  @ApiPropertyOptional({
    description: 'Search by title (partial match)',
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({
    description: 'Filter by brand',
  })
  @IsString()
  @IsOptional()
  brand?: string;

  @ApiPropertyOptional({
    description: 'Filter by model',
  })
  @IsString()
  @IsOptional()
  model?: string;

  @ApiPropertyOptional({
    description: 'Filter by transmission type',
    enum: Transmission,
  })
  @IsEnum(Transmission)
  @IsOptional()
  transmission?: Transmission;

  @ApiPropertyOptional({
    description: 'Filter by fuel type',
    enum: FuelType,
  })
  @IsEnum(FuelType)
  @IsOptional()
  fuelType?: FuelType;

  @ApiPropertyOptional({
    description: 'Filter by status',
    enum: CarStatus,
  })
  @IsEnum(CarStatus)
  @IsOptional()
  status?: CarStatus;

  @ApiPropertyOptional({
    description: 'Filter by pickup location (partial match)',
  })
  @IsString()
  @IsOptional()
  pickupLocation?: string;

  @ApiPropertyOptional({
    description: 'Minimum daily price',
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  minPrice?: number;

  @ApiPropertyOptional({
    description: 'Maximum daily price',
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  maxPrice?: number;

  @ApiPropertyOptional({
    description: 'Minimum seat count',
  })
  @IsNumber()
  @Min(1)
  @IsOptional()
  minSeatCount?: number;

  @ApiPropertyOptional({
    description: 'Maximum seat count',
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
    enum: ['createdAt', 'dailyPrice', 'title', 'brand']
  })
  @IsString()
  @IsOptional()
  sortBy?: string = 'createdAt';

  @ApiPropertyOptional({
    description: 'Sort order',
    enum: ['asc', 'desc']
  })
  @IsString()
  @IsOptional()
  sortOrder?: 'asc' | 'desc' = 'desc';
}
