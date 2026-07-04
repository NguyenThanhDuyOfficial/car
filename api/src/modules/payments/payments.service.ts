import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import Stripe from 'stripe'
import { CreatePaymentIntentDto } from './dto/create-payment-intent.dto';
import { OrderStatus, PaymentStatus } from 'src/generated/prisma/enums';
import { ConfirmPaymentDto } from './dto/confirm-payment.dto';
import { PaymentResponseDto } from './dto/payment-response.dto';
import { Prisma } from 'src/generated/prisma/client';

@Injectable()
export class PaymentsService {
  private stripe: Stripe
  constructor(private prisma: PrismaService) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2026-06-24.dahlia'
    })
  }

  async createPaymentIntent(userId: string, createPaymentIntentDto: CreatePaymentIntentDto): Promise<{
    success: boolean,
    data: { clientSecret: string, paymentId: string },
    message: string
  }> {
    const { orderId, amount } = createPaymentIntentDto

    const order = await this.prisma.order.findFirst({
      where: { id: orderId, userId }
    })

    if (!order) { throw new NotFoundException(`Order with ID ${orderId} not found`) }
    const existingPayment = await this.prisma.payment.findFirst({
      where: { orderId }
    })

    if (existingPayment && existingPayment.status === PaymentStatus.COMPLETED) {
      throw new BadRequestException('Payment already completed for this order')
    }
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: Math.round(amount),
      currency: 'usd',
      metadata: { orderId, userId }
    })
    const payment = await this.prisma.payment.create({
      data: {
        orderId,
        userId,
        amount,
        status: PaymentStatus.PENDING,
        paymentMethod: 'STRIPE',
        transactionId: paymentIntent.id
      }
    })
    return {
      success: true,
      data: {
        clientSecret: paymentIntent.client_secret!,
        paymentId: payment.id
      },
      message: "Payment intent created successfully"
    }
  }

  async confirmPayment(userId: string, confirmPaymentDto: ConfirmPaymentDto): Promise<{
    success: boolean,
    data: PaymentResponseDto,
    message: string
  }> {
    const { paymentIntentId, orderId } = confirmPaymentDto

    const payment = await this.prisma.payment.findFirst({
      where: { userId, orderId, transactionId: paymentIntentId }
    })
    if (!payment) { throw new NotFoundException('Payment not found') }

    if (payment.status === PaymentStatus.COMPLETED) {
      throw new BadRequestException("Payment already completed")
    }
    const paymentIntent = await this.stripe.paymentIntents.retrieve(paymentIntentId)
    if (paymentIntent.status !== 'succeeded') {
      throw new BadRequestException("Payment not successful")
    }
    const [updatedPayment] = await this.prisma.$transaction([
      this.prisma.payment.update({
        where: { id: payment.id },
        data: { status: PaymentStatus.COMPLETED }
      }),
      this.prisma.order.update({
        where: { id: orderId },
        data: { status: OrderStatus.PROCESSING }
      })
    ])
    return {
      success: true,
      data: this.mapToPaymentResponse(updatedPayment),
      message: "Payment confirmed"
    }
  }
  async findAll(userId: string): Promise<{
    success: boolean,
    data: PaymentResponseDto[],
    message: string
  }> {
    const payments = await this.prisma.payment.findMany({
      where: { id: userId },
      orderBy: { createdAt: 'desc' }
    })
    return {
      success: true,
      data: payments.map((payment) => this.mapToPaymentResponse(payment)),
      message: "Payments retrieved successfully"
    }
  }
  async findOne(id: string, userId: string): Promise<{
    success: boolean,
    data: PaymentResponseDto,
    message: string
  }> {
    const payment = await this.prisma.payment.findFirst({
      where: { id, userId }
    })
    if (!payment) throw new NotFoundException("Payment not found")
    return {
      success: true,
      data: this.mapToPaymentResponse(payment),
      message: "Payment retrieved successfully"
    }
  }
  async findByOrderId(orderId: string, userId: string): Promise<{

    success: boolean,
    data: PaymentResponseDto,
    message: string
  }> {
    const payment = await this.prisma.payment.findFirst({
      where: { orderId, userId }
    })
    if (!payment) throw new NotFoundException("Payment not found")

    return {
      success: true,
      data: this.mapToPaymentResponse(payment),
      message: "Payment retrieved successfully"
    }
  }

  private mapToPaymentResponse(payment: {
    id: string,
    orderId: string,
    userId: string,
    amount: Prisma.Decimal
    status: PaymentStatus,
    paymentMethod: string | null,
    transactionId: string | null,
    paymentDate: Date | null,
    createdAt: Date,
    updatedAt: Date
  }): PaymentResponseDto {
    return {
      id: payment.id,
      orderId: payment.orderId,
      userId: payment.userId,
      amount: Number(payment.amount),
      status: payment.status,
      paymentMethod: payment.paymentMethod,
      transationId: payment.transactionId,
      paymentDate: payment.paymentDate,
      createdAt: payment.createdAt,
      updatedAt: payment.updatedAt
    }
  }

}
