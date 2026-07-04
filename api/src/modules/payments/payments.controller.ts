import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBadGatewayResponse, ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { CreatePaymentIntentApiResponseDto, CreatePaymentIntentResponse, PaymentApiResonseDto } from './dto/payment-response.dto';
import { CreatePaymentIntentDto } from './dto/create-payment-intent.dto';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { create } from 'domain';
import { ConfirmPaymentDto } from './dto/confirm-payment.dto';

@ApiTags("Payments")
@Controller('payments')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth("JWT-auth")
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) { }

  @Post("create-intent")
  @ApiOperation({ summary: "create payment intent", description: "Create a payment intent for an order" })
  @ApiCreatedResponse({
    description: "Payment intent created successfully",
    type: CreatePaymentIntentApiResponseDto
  })
  @ApiBadRequestResponse({
    description: "Invalid data or order not found"
  })
  async createPaymentIntent(@Body() createPaymentIntentDto: CreatePaymentIntentDto, @GetUser('id') userId: string) {
    return await this.paymentsService.createPaymentIntent(userId, createPaymentIntentDto)
  }

  @Post('confirm')
  @ApiOperation({
    summary: "Confirm payment",
    description: "Confirm payment intent for an order"
  })
  @ApiResponse({
    status: 200,
    description: "Payment confirmed",
    type: PaymentApiResonseDto
  })
  @ApiBadRequestResponse({
    description: "Payment not found or already completed"
  })
  async confirmPayment(@Body() confirmPaymentDto: ConfirmPaymentDto, @GetUser('id') userId: string) {
    return await this.paymentsService.confirmPayment(userId, confirmPaymentDto)
  }

  @Get()
  @ApiOperation({
    summary: "Get all payments",
    description: "Get all payments for the current user"
  })
  @ApiOkResponse({
    description: "Payment retrieved successfully",
    type: PaymentApiResonseDto
  })
  async findAll(@GetUser('id') userId: string) {
    return await this.paymentsService.findAll(userId)
  }

  @Get('id')
  @ApiParam({
    name: 'id',
    description: 'Payment ID',
    example: "123123-e38547324"
  })
  @ApiOperation({
    summary: "Get payment by ID",
    description: "Get a specific payment by its ID"
  })
  @ApiOkResponse({
    description: "Payment retrieved successfully"
  })
  @ApiNotFoundResponse({
    description: "Payment not found"
  })
  async findOne(@Param('id') id: string, @GetUser('id') userId: string) {
    return await this.paymentsService.findOne(id, userId)
  }

  @Get('order/:id')
  @ApiParam({
    name: "orderId",
    description: "Order ID",
    example: 'order-123'
  })
  @ApiOperation({
    summary: "Get payment by order ID",
    description: "Get payment information for a specific order"
  })
  @ApiOkResponse({
    description: "Payment retrieved successfully",
    type: PaymentApiResonseDto
  })
  @ApiNotFoundResponse({
    description: "Payment not found"
  })
  async findByOrderId(@Param('orderId') orderId: string, @GetUser('id') userId: string) {
    return await this.paymentsService.findByOrderId(orderId, userId)
  }
}
