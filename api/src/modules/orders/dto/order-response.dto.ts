import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsDateString, IsDecimal, IsEnum, IsOptional, IsString, ValidateNested } from "class-validator";
import { OrderStatus } from "src/generated/prisma/enums";
import { CarResponseDto } from "src/modules/cars/dto/car-response.dto";
import { UserResponseDto } from "src/modules/users/dto/user-response.dto";

export class OrderApiResponseDto<T> {
  @ApiProperty({
    description: "Indicates if the request was successfull"
  })
  success!: boolean

  @ApiProperty({
    description: "Return data",
    type: Object
  })
  data!: T

  @ApiProperty({
    description: "Optional message",
    nullable: true,
    required: false
  })
  message?: string
}

export class OrderResponseDto {
  @ApiProperty({ description: 'Order ID' })
  @IsString()
  id!: string;

  @ApiProperty({ description: 'User ID' })
  @IsString()
  userId!: string;

  @ApiProperty({ description: 'User details' })
  @ValidateNested()
  @Type(() => UserResponseDto)
  user!: UserResponseDto;

  @ApiProperty({ description: 'Car ID' })
  @IsString()
  carId!: string;

  @ApiProperty({ description: 'Car details' })
  @ValidateNested()
  @Type(() => CarResponseDto)
  car!: CarResponseDto;

  @ApiProperty({ description: 'Pickup time' })
  @IsDateString()
  pickupTime!: Date;

  @ApiProperty({ description: 'Dropoff time' })
  @IsDateString()
  dropoffTime!: Date;

  @ApiPropertyOptional({ description: 'Actual pickup time' })
  @IsDateString()
  @IsOptional()
  actualPickupTime?: Date;

  @ApiPropertyOptional({ description: 'Actual dropoff time' })
  @IsDateString()
  @IsOptional()
  actualDropoffTime?: Date;

  @ApiProperty({ description: 'Daily price' })
  @IsDecimal()
  dailyPrice!: number;

  @ApiProperty({ description: 'Car insurance' })
  @IsDecimal()
  carInsurance!: number;

  @ApiProperty({ description: 'Renter insurance' })
  @IsDecimal()
  renterInsurance!: number;

  @ApiProperty({ description: 'Over limit fee' })
  @IsDecimal()
  overLimitFee?: number;

  @ApiProperty({ description: 'Overtime fee' })
  @IsDecimal()
  overTimeFee?: number;

  @ApiProperty({ description: 'Cleaning fee' })
  @IsDecimal()
  cleaningFee?: number;

  @ApiProperty({ description: 'Deodorizing fee' })
  @IsDecimal()
  deodorizingFee?: number;

  @ApiProperty({ description: 'Total amount' })
  @IsDecimal()
  totalAmount!: number;

  @ApiProperty({ description: 'Order status', enum: OrderStatus })
  @IsEnum(OrderStatus)
  status?: OrderStatus;

  @ApiPropertyOptional({ description: 'Driver notes' })
  @IsString()
  @IsOptional()
  driverNotes?: string;

  @ApiPropertyOptional({ description: 'Customer notes' })
  @IsString()
  @IsOptional()
  customerNotes?: string;

  @ApiPropertyOptional({ description: 'Cancellation reason' })
  @IsString()
  @IsOptional()
  cancellationReason?: string;

  @ApiProperty({ description: 'Created at' })
  @IsDateString()
  createdAt!: Date;

  @ApiProperty({ description: 'Updated at' })
  @IsDateString()
  updatedAt!: Date;
}

export class PaginatedOrderResponseDto {
  @ApiProperty({
    type: [OrderResponseDto]
  })
  data?: OrderResponseDto

  @ApiProperty()
  total?: number

  @ApiProperty()
  page?: number

  @ApiProperty()
  limit?: number
}
