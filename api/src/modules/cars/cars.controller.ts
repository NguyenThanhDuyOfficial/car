import { Body, Controller, Get, Post, UseGuards, Query, Param, Patch, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CarsService } from './cars.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { CarStatus, Role } from 'src/generated/prisma/enums';
import { CreateCarDto } from './dto/create-car.dto';
import { CarResponseDto } from './dto/car-response.dto';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { QueryCarDto } from './dto/query-car.dto';
import { UpdateCarDTo } from './dto/update-car.dto';

@ApiTags('Cars')
@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) { }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth("JWT-auth")
  @ApiOperation({
    summary: 'Create a new car',
  })
  @ApiResponse({
    status: 201,
    description: 'Car created successfully',
    type: CarResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Insufficient role' })
  async create(
    @Body() createCarDto: CreateCarDto, @GetUser('id') id: string
  ): Promise<CarResponseDto> {
    createCarDto.ownerId = id
    return await this.carsService.create(createCarDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all cars with optional filters',
  })
  @ApiResponse({
    status: 200,
    description: 'List of cars retrieved successfully',
    schema: {
      type: "object",
      properties: {
        data: {
          type: "array",
          items: { $ref: '#/components/schemas/CarResponseDto' }
        },
        meta: {
          type: 'object',
          properties: {
            total: { type: 'number' },
            page: { type: 'number' },
            limit: { type: 'number' },
            totalPages: { type: 'number' }
          }
        }
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Invalid filter parameters' })
  async findAll(@Query() queryDto: QueryCarDto) {
    return await this.carsService.findAll(queryDto)
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get car details by ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Car details retrieved successfully',
    type: CarResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Car not found' })
  async findOne(@Param('id') id: string): Promise<CarResponseDto> {
    return await this.carsService.findOne(id)
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth("JWT-auth")
  @ApiOperation({
    summary: 'Update car details (ADMIN only)',
  })
  @ApiBody({ type: UpdateCarDTo })
  @ApiResponse({
    status: 200,
    description: 'Car updated successfully',
    type: CarResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Car not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Insufficient role' })
  async update(
    @Param('id') id: string,
    @Body() updateCarDto: UpdateCarDTo,
  ): Promise<CarResponseDto> {
    return await this.carsService.update(id, updateCarDto)
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth("JWT-auth")
  @ApiOperation({
    summary: 'Update car status',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        status: {
          type: "string",
          description: "Change car status",
          example: "AVAILABLE"
        }
      }
    }
  })
  @ApiResponse({
    status: 200,
    description: 'Car status updated successfully',
  })
  @ApiResponse({ status: 404, description: 'Car not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: CarStatus,
  ): Promise<CarResponseDto> {
    return await this.carsService.updateStatus(id, status)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth("JWT-auth")
  @ApiOperation({
    summary: 'Delete a car',
  })
  @ApiResponse({
    status: 200,
    description: 'Car deleted successfully',
  })
  @ApiResponse({ status: 404, description: 'Car not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin only' })
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    return await this.carsService.remove(id)
  }

}
