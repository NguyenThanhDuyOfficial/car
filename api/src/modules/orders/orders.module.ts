import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { CarsService } from '../cars/cars.service';
import { CarsModule } from '../cars/cars.module';

@Module({
  imports: [CarsModule],
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule { }
