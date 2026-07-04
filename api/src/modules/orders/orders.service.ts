import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderApiResponseDto, OrderResponseDto } from './dto/order-response.dto';
import { OrderStatus } from 'src/generated/prisma/enums';
import { CarsService } from '../cars/cars.service';
import { Prisma } from 'src/generated/prisma/client';
import { Order } from 'src/generated/prisma/client';
import { UserResponseDto } from '../users/dto/user-response.dto';
import { CarResponseDto } from '../cars/dto/car-response.dto';
import { QueryOrderDto } from './dto/query-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';


@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService,
    private carsService: CarsService) { }

  async create(userId: string, createOrderDto: CreateOrderDto): Promise<OrderApiResponseDto<OrderResponseDto>> {
    return this.prisma.$transaction(async (tx) => {
      await this.validateCarAvailability(
        createOrderDto.carId,
        new Date(createOrderDto.pickupTime),
        new Date(createOrderDto.dropoffTime),
        tx
      )
      this.validateOrderDates(
        new Date(createOrderDto.pickupTime),
        new Date(createOrderDto.dropoffTime),
      )

      let totalAmount = createOrderDto.totalAmount
      const car = await this.carsService.findOne(createOrderDto.carId)
      if (!totalAmount || totalAmount === 0) {
        totalAmount = await this.calculateTotalAmount(createOrderDto, car)
      }

      const orderData: Prisma.OrderCreateInput = {
        user: { connect: { id: createOrderDto.userId } },
        car: { connect: { id: createOrderDto.carId } },
        pickupTime: new Date(createOrderDto.pickupTime),
        dropoffTime: new Date(createOrderDto.dropoffTime),
        dailyPrice: new Prisma.Decimal(createOrderDto.dailyPrice),
        carInsurance: new Prisma.Decimal(createOrderDto.carInsurance),
        renterInsurance: new Prisma.Decimal(createOrderDto.renterInsurance),
        overLimitFee: new Prisma.Decimal(createOrderDto.overLimitFee || 0),
        overTimeFee: new Prisma.Decimal(createOrderDto.overTimeFee || 0),
        cleaningFee: new Prisma.Decimal(createOrderDto.cleaningFee || 0),
        deodorizingFee: new Prisma.Decimal(createOrderDto.deodorizingFee || 0),
        totalAmount: new Prisma.Decimal(totalAmount),
        status: OrderStatus.PENDING,
        driverNotes: createOrderDto.driverNotes,
        customerNotes: createOrderDto.customerNotes,
      };

      const order = await tx.order.create({
        data: orderData,
        include: {
          user: true,
          car: true,
          payments: true
        }
      })
      return this.wrap(order)
    })
  }

  async findAllForAdmin(queryOrderDto: QueryOrderDto): Promise<{
    data: OrderResponseDto[],
    total: number,
    page: number,
    limit: number
  }> {
    const { page = 1, limit = 10, status, search } = queryOrderDto
    const skip = (page - 1) * limit

    const where: any = {}
    if (status) where.status = status
    if (search) {
      where.OR = [
        { id: { contains: search, mode: 'insensitive' } },
        { orderNumber: { contains: search, mode: 'insensitive' } }
      ]
    }
    const [orders, total] = await Promise.all([
      this.prisma.order.findMany({
        where,
        skip,
        take: limit,
        include: {
          user: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
            }
          },
          car: true,
          payments: true
        },
        orderBy: { createdAt: 'desc' }
      }),

      this.prisma.order.count({ where })
    ])
    return {
      data: orders.map((o) => this.map(o)),
      total,
      page,
      limit
    }
  }

  async findAll(userId: string, query: QueryOrderDto): Promise<{
    data: OrderResponseDto[],
    total: number,
    page: number,
    limit: number
  }> {
    const { page = 1, limit = 10, status, search } = query
    const skip = (page - 1) * limit

    const where: any = { userId }
    if (status) where.status = status
    if (search) where.OR = [{ id: { contains: search, mode: 'insensitive' } }]

    const [orders, total] = await Promise.all([
      this.prisma.order.findMany({
        where,
        skip,
        take: limit,
        include: {
          user: true,
          car: true,
          payments: true
        },
        orderBy: { createdAt: 'desc' }
      }),
      this.prisma.order.count({ where })
    ])

    return {
      data: orders.map((o) => this.map(o)),
      total,
      page,
      limit
    }
  }

  async findOne(id: string, userId?: string): Promise<OrderApiResponseDto<OrderResponseDto>> {
    const where: any = { id }
    if (userId) where.userId = userId
    const order = await this.prisma.order.findFirst({
      where,
      include: {
        user: true,
        car: true,
        payments: true
      }
    })
    if (!order) { throw new NotFoundException(`Order with ID ${id} not found`) }

    return this.wrap(order
    )
  }

  async update(id: string, updateOrderDto: UpdateOrderDto, userId?: string): Promise<OrderApiResponseDto<OrderResponseDto>> {
    const where: any = { id }
    if (userId) where.userId = userId

    const existing = await this.prisma.order.findFirst({
      where,
    })
    if (!existing) throw new NotFoundException("Order not found")
    const updated = await this.prisma.order.update({
      where: { id },
      data: updateOrderDto,
      include: {
        user: true,
        car: true,
        payments: true
      }
    })
    return this.wrap(updated)
  }

  async cancel(id: string, userId?: string): Promise<OrderApiResponseDto<OrderResponseDto>> {
    const where: any = { id }
    if (userId) where.userId = userId

    const order = await this.prisma.order.findFirst({
      where,
      include: {
        user: true,
        car: true,
        payments: true
      }
    })
    if (!order) { throw new NotFoundException("Order not found") }

    if (order.status !== OrderStatus.PENDING) {
      throw new BadRequestException('Only pending orders can be cancelled')
    }
    const cancelled = await this.prisma.order.update({
      where,
      data: { status: OrderStatus.CANCELLED },
      include: {
        user: true,
        car: true,
        payments: true
      }
    })
    return this.wrap(cancelled)
  }

  private wrap(order: Order): OrderApiResponseDto<OrderResponseDto> {
    return {
      success: true,
      message: "Order retreived successfully",
      data: this.map(order)
    }
  }
  private map(order: any): OrderResponseDto {
    const userResponse: UserResponseDto = order.user ? {
      id: order.user.id,
      email: order.user.email,
      firstName: order.user.firstName,
      lastName: order.user.lastName,
      phone: order.user.phone,
      avatarUrl: order.user.avatarUrl,
      role: order.user.role,
      createdAt: order.user.createdAt,
      updatedAt: order.user.updatedAt,
    } : {} as UserResponseDto;

    // Map car to CarResponseDto
    const carResponse: CarResponseDto = order.car ? {
      id: order.car.id,
      ownerId: order.car.ownerId,
      title: order.car.title,
      description: order.car.description,
      licensePlate: order.car.licensePlate,
      brand: order.car.brand,
      model: order.car.model,
      seatCount: order.car.seatCount,
      transmission: order.car.transmission,
      fuelType: order.car.fuelType,
      status: order.car.status,
      pickupLocation: order.car.pickupLocation,
      dailyPrice: Number(order.car.dailyPrice),
      createdAt: order.car.createdAt,
      updatedAt: order.car.updatedAt,
    } : {} as CarResponseDto;

    // Build OrderResponseDto
    return {
      id: order.id,
      userId: order.userId,
      user: userResponse,
      carId: order.carId,
      car: carResponse,
      pickupTime: new Date(order.pickupTime),
      dropoffTime: new Date(order.dropoffTime),
      actualPickupTime: order.actualPickupTime ? new Date(order.actualPickupTime) : undefined,
      actualDropoffTime: order.actualDropoffTime ? new Date(order.actualDropoffTime) : undefined,
      dailyPrice: Number(order.dailyPrice),
      carInsurance: Number(order.carInsurance),
      renterInsurance: Number(order.renterInsurance),
      overLimitFee: Number(order.overLimitFee || 0),
      overTimeFee: Number(order.overTimeFee || 0),
      cleaningFee: Number(order.cleaningFee || 0),
      deodorizingFee: Number(order.deodorizingFee || 0),
      totalAmount: Number(order.totalAmount),
      status: order.status,
      driverNotes: order.driverNotes || undefined,
      customerNotes: order.customerNotes || undefined,
      cancellationReason: order.cancellationReason || undefined,
      createdAt: new Date(order.createdAt),
      updatedAt: new Date(order.updatedAt),
    };
  }
  private async calculateTotalAmount(
    createOrderDto: CreateOrderDto,
    car: any
  ): Promise<number> {

    const pickupTime = new Date(createOrderDto.pickupTime);
    const dropoffTime = new Date(createOrderDto.dropoffTime);

    // Calculate number of days
    const diffTime = Math.abs(dropoffTime.getTime() - pickupTime.getTime());
    const numberOfDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Base rental cost
    const dailyPrice = Number(createOrderDto.dailyPrice);
    const baseCost = dailyPrice * numberOfDays;

    // Insurance costs (per day)
    const carInsurance = Number(createOrderDto.carInsurance);
    const renterInsurance = Number(createOrderDto.renterInsurance);
    const insuranceCost = (carInsurance + renterInsurance) * numberOfDays;

    // Additional fees
    const overLimitFee = Number(createOrderDto.overLimitFee || 0);
    const overTimeFee = Number(createOrderDto.overTimeFee || 0);
    const cleaningFee = Number(createOrderDto.cleaningFee || 0);
    const deodorizingFee = Number(createOrderDto.deodorizingFee || 0);
    const totalFees = overLimitFee + overTimeFee + cleaningFee + deodorizingFee;

    const total = baseCost + insuranceCost + totalFees;

    return Number((total).toFixed(2));
  }
  private async validateCarAvailability(
    carId: string,
    pickupTime: Date,
    dropoffTime: Date,
    tx: Prisma.TransactionClient

  ): Promise<void> {
    const overlappingOrders = await tx.order.findMany({
      where: {
        carId,
        status: {
          in: [OrderStatus.PAID, OrderStatus.PENDING, OrderStatus.ACTIVE],
        },
        pickupTime: { lt: dropoffTime },
        dropoffTime: { gt: pickupTime }
      }
    })
    if (overlappingOrders.length > 0) {
      throw new ConflictException(
        "Car is not available for the selected date range."
      )
    }

  }
  private validateOrderDates(pickupTime: Date, dropoffTime: Date): void {
    const now = new Date();

    const minPickupTime = new Date(now.getTime() + 60 * 60 * 1000);
    if (pickupTime < minPickupTime) {
      throw new BadRequestException(
        'Pickup time must be at least 1 hour from now',
      );
    }

    if (dropoffTime <= pickupTime) {
      throw new BadRequestException(
        'Dropoff time must be after pickup time',
      );
    }

    const maxDuration = 30 * 24 * 60 * 60 * 1000;
    if (dropoffTime.getTime() - pickupTime.getTime() > maxDuration) {
      throw new BadRequestException(
        'Maximum rental duration is 30 days',
      );
    }
  }

}
