import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCarDto } from './dto/create-car.dto';
import { CarResponseDto } from './dto/car-response.dto';
import { Car, CarStatus, Prisma } from 'src/generated/prisma/client';
import { QueryCarDto } from './dto/query-car.dto';
import { plainToInstance } from 'class-transformer';
import { UpdateCarDTo } from './dto/update-car.dto';
import { ApiNonAuthoritativeInformationResponse } from '@nestjs/swagger';


@Injectable()
export class CarsService {
  constructor(private prisma: PrismaService) { }

  async create(createCarDto: CreateCarDto): Promise<CarResponseDto> {
    const car = await this.prisma.car.create({
      data: {
        ...createCarDto,
        dailyPrice: new Prisma.Decimal(createCarDto.dailyPrice),
      },
    })
    return this.formatCar(car)
  }

  async findAll(queryDto: QueryCarDto): Promise<{
    data: CarResponseDto[],
    meta: {
      total: number,
      page: number,
      limit: number,
      totalPages: number
    }
  }> {

    const { ownerId, title, brand, model, transmission, fuelType, status, pickupLocation, minPrice, maxPrice, minSeatCount, maxSeatCount, page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = queryDto

    const where: Prisma.CarWhereInput = {}

    if (ownerId) {
      where.ownerId = ownerId
    }
    if (title) {
      where.title = {
        contains: title,
        mode: 'insensitive',
      };
    }

    if (brand) {
      where.brand = {
        contains: brand,
        mode: 'insensitive',
      };
    }

    if (model) {
      where.model = {
        contains: model,
        mode: 'insensitive',
      };
    }

    if (transmission) {
      where.transmission = transmission;
    }

    if (fuelType) {
      where.fuelType = fuelType;
    }

    if (status) {
      where.status = status;
    }

    if (pickupLocation) {
      where.pickupLocation = {
        contains: pickupLocation,
        mode: 'insensitive',
      };
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      where.dailyPrice = {};
      if (minPrice !== undefined) {
        where.dailyPrice.gte = minPrice;
      }
      if (maxPrice !== undefined) {
        where.dailyPrice.lte = maxPrice;
      }
    }

    if (minSeatCount !== undefined || maxSeatCount !== undefined) {
      where.seatCount = {};
      if (minSeatCount !== undefined) {
        where.seatCount.gte = minSeatCount;
      }
      if (maxSeatCount !== undefined) {
        where.seatCount.lte = maxSeatCount;
      }
    }

    const skip = (page - 1) * limit
    const orderBy: Prisma.CarOrderByWithRelationInput = {
      [sortBy]: sortOrder
    }

    const [cars, total] = await Promise.all([
      this.prisma.car.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        include: {
          owner: {
            select: {
              email: true,
              firstName: true,
              lastName: true,
              phone: true,
              avatarUrl: true,
              refreshToken: false,
              password: false
            }
          }
        }
      }),
      this.prisma.car.count({ where })
    ])
    const data = cars.map(car => {
      const plainCar = {
        ...car,
        dailyPrice: Number(car.dailyPrice)
      }
      return plainToInstance(CarResponseDto, plainCar, {
        excludeExtraneousValues: true
      })
    })

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    }
  }

  async findOne(id: string): Promise<CarResponseDto> {
    const car = await this.prisma.car.findUnique({
      where: { id: id },
      include: {
        owner: {
          select: {
            email: true,
            firstName: true,
            lastName: true,
            phone: true,
            avatarUrl: true,
            refreshToken: false,
            password: false
          }
        }
      }
    })
    if (!car) {
      throw new NotFoundException("Car not found")
    }
    return this.formatCar(car)
  }

  async update(id: string, updateCarDto: UpdateCarDTo): Promise<CarResponseDto> {
    const existingCar = await this.prisma.car.findUnique({ where: { id } })
    if (!existingCar) {
      throw new NotFoundException("Car not found")
    }

    const updateData: any = { ...updateCarDto }
    const updatedCar = await this.prisma.car.update({
      where: { id },
      data: updateData
    })
    return this.formatCar(updatedCar)
  }
  async updateStatus(id: string, status: CarStatus): Promise<CarResponseDto> {
    const car = await this.prisma.car.findUnique({ where: { id } })
    if (!car) {
      throw new NotFoundException("Car not found")
    }

    const updatedstatus = await this.prisma.car.update({
      where: { id },
      data: { status: status }
    })

    return this.formatCar(updatedstatus)
  }
  async remove(id: string): Promise<{ message: string }> {
    const car = await this.prisma.car.findUnique({ where: { id }, include: { orders: true } })
    if (!car) {
      throw new NotFoundException("Car not found")
    }

    if (car.orders.length > 0) {
      throw new BadRequestException(
        'Cannot delete car that is part of existing orders. Consier making it as inactive only'
      )
    }

    await this.prisma.car.delete({
      where: { id }
    })

    return { message: "Car deleted successfully" }
  }
  private formatCar(car: Car): CarResponseDto {
    return {
      ...car,
      dailyPrice: Number(car.dailyPrice)
    }
  }

}
