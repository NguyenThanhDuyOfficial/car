import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreatePaymentIntentDto {
  @IsNotEmpty()
  @IsString()
  orderId!: string

  @IsNotEmpty()
  @IsString()
  userId!: string

  @IsNotEmpty()
  @IsNumber()
  amount!: number
}
