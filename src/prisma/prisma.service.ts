import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { ConfigService } from "@nestjs/config";


@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor(private readonly configService: ConfigService) {
    const adapter = new PrismaPg({
      connectionString: configService.get<string>('DATABASE_URL'),
    });
    super({ adapter, log: configService.get<string>("NODE_ENV") === 'development' ? ['query', 'error', 'warn'] : ['error'], });
  }
  async onModuleInit() {
    await this.$connect()
    console.log("Prisma Connected")
  }
  async onModuleDestroy() {
    await this.$disconnect()
    console.log("Prisma Disconnected")
  }
  async cleanDatabase() {
    if (this.configService.get<string>("NODE_ENV") === 'production') {
      throw new Error("Cannot clean database in production")
    }
    const models = Reflect.ownKeys(this).filter(
      (key) => typeof key === 'string' && !key.startsWith('_'),
    )
    return Promise.all(
      models.map((modelKey) => {
        if (typeof modelKey === 'string')
          return this[modelKey].deleteMany();
      })
    )
  }
}
