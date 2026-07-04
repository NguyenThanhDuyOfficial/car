import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './modules/users/users.module';
import { CarsModule } from './modules/cars/cars.module';
import { OrdersModule } from './modules/orders/orders.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { PaymentsModule } from './modules/payments/payments.module';

@Module({
  imports: [AuthModule, PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60,
        limit: 10
      }
    ]),
    UsersModule,
    CarsModule,
    OrdersModule,
    PaymentsModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
