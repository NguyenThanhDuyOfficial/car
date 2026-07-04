import { ApiProperty } from "@nestjs/swagger";
import { PaymentStatus } from "src/generated/prisma/enums";

export class PaymentResponseDto {
  @ApiProperty({
    example: "12334785-324882374"
  })
  id!: string

  @ApiProperty({
    example: "user-1213"
  })
  userId!: string

  @ApiProperty({
    example: "order-1213"
  })
  orderId!: string

  @ApiProperty({
    example: "Stripe"
  })
  paymentMethod?: string | null

  @ApiProperty({
    example: "100.000"
  })
  amount!: number
  @ApiProperty({
    example: "pi_21938123",
    nullable: true
  })
  transationId!: string | null
  @ApiProperty({
    example: "PENDING",
    enum: PaymentStatus
  })
  status!: PaymentStatus

  @ApiProperty({
  })
  paymentDate?: Date | null


  @ApiProperty({
  })
  createdAt!: Date
  @ApiProperty({
  })
  updatedAt!: Date
}

export class CreatePaymentIntentResponse {
  @ApiProperty({
    example: "pi_2341235",
    description: "Stripe client secret for payment confirmation"
  })
  clientSecret!: string

  @ApiProperty({
    example: "2834723-32389472817",
    description: "Payment ID"
  })
  paymentId!: string

}
export class PaymentApiResonseDto {
  @ApiProperty({
    example: true
  })
  success!: boolean

  @ApiProperty({
    type: CreatePaymentIntentResponse
  })
  data?: PaymentResponseDto

  @ApiProperty({
    example: "Payment retrieved successfully",
    required: false
  })
  message?: string
}

export class CreatePaymentIntentApiResponseDto {
  @ApiProperty({
    example: true
  })
  success!: boolean

  @ApiProperty({
    type: CreatePaymentIntentResponse
  })
  data?: CreatePaymentIntentResponse

  @ApiProperty({
    example: "Paymen intent created successfully",
    required: false
  })
  message?: string
}
