import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsDecimal,
  IsOptional,
  IsEnum,
  Min,
  ValidateIf,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { OrderStatus } from 'src/generated/prisma/enums';

export class CreateOrderDto {
  @ApiProperty({
    description: 'User ID',
    example: 'cmr3l5jgw0000qnbq939xdrwc',
  })
  @IsString()
  @IsNotEmpty()
  userId!: string;

  @ApiProperty({
    description: 'Car ID',
    example: 'cmr4t6ndv0000wrbqdkyu7s4d',
  })
  @IsString()
  @IsNotEmpty()
  carId!: string;

  @ApiProperty({
    description: 'Pickup time (ISO 8601 format)',
    example: '2026-07-10T09:00:00.000Z',
  })
  @IsDateString()
  @IsNotEmpty()
  pickupTime!: string;

  @ApiProperty({
    description: 'Dropoff time (ISO 8601 format)',
    example: '2026-07-15T18:00:00.000Z',
  })
  @IsDateString()
  @IsNotEmpty()
  dropoffTime!: string;

  @ApiPropertyOptional({
    description: 'Actual pickup time (ISO 8601 format)',
    example: '2026-07-10T09:15:00.000Z',
  })
  @IsDateString()
  @IsOptional()
  actualPickupTime?: string;

  @ApiPropertyOptional({
    description: 'Actual dropoff time (ISO 8601 format)',
    example: '2026-07-15T18:30:00.000Z',
  })
  @IsDateString()
  @IsOptional()
  actualDropoffTime?: string;

  @ApiProperty({
    description: 'Daily price in USD',
    example: 100.00,
    minimum: 0,
  })
  @IsNotEmpty()
  @Min(0)
  dailyPrice!: number;

  @ApiProperty({
    description: 'Car insurance cost in USD',
    example: 20.00,
    minimum: 0,
  })
  @IsNotEmpty()
  @Min(0)
  carInsurance!: number;

  @ApiProperty({
    description: 'Renter insurance cost in USD',
    example: 15.00,
    minimum: 0,
  })
  @IsNotEmpty()
  @Min(0)
  renterInsurance!: number;

  @ApiPropertyOptional({
    description: 'Over limit fee in USD',
    example: 10.00,
    minimum: 0,
    default: 0,
  })
  @IsOptional()
  @Min(0)
  overLimitFee?: number;

  @ApiPropertyOptional({
    description: 'Overtime fee in USD',
    example: 15.00,
    minimum: 0,
    default: 0,
  })
  @IsOptional()
  @Min(0)
  overTimeFee?: number;

  @ApiPropertyOptional({
    description: 'Cleaning fee in USD',
    example: 25.00,
    minimum: 0,
    default: 0,
  })
  @IsOptional()
  @Min(0)
  cleaningFee?: number;

  @ApiPropertyOptional({
    description: 'Deodorizing fee in USD',
    example: 10.00,
    minimum: 0,
    default: 0,
  })
  @IsOptional()
  @Min(0)
  deodorizingFee?: number;

  @ApiProperty({
    description: 'Total amount in USD',
    example: 685.00,
    minimum: 0,
  })
  @IsNotEmpty()
  @Min(0)
  totalAmount!: number;

  @ApiPropertyOptional({
    description: 'Order status',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
    example: OrderStatus.PENDING,
  })
  @IsEnum(OrderStatus)
  @IsOptional()
  status?: OrderStatus;

  @ApiPropertyOptional({
    description: 'Driver notes',
    example: 'Customer requested contactless delivery',
  })
  @IsString()
  @IsOptional()
  driverNotes?: string;

  @ApiPropertyOptional({
    description: 'Customer notes',
    example: 'Please have the car ready by 8:45 AM',
  })
  @IsString()
  @IsOptional()
  customerNotes?: string;

  @ApiPropertyOptional({
    description: 'Cancellation reason (required if status is CANCELLED)',
    example: 'Customer changed their mind',
  })
  @IsString()
  @IsOptional()
  @ValidateIf(o => o.status === OrderStatus.CANCELLED)
  cancellationReason?: string
}
