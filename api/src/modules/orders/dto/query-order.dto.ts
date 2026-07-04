import { Type } from "class-transformer";
import { IsOptional, IsString } from "class-validator";
import { OrderStatus } from "src/generated/prisma/enums";

export class QueryOrderDto {
  @IsOptional()
  @Type(() => Number)
  page?: number = 1

  @IsOptional()
  @Type(() => Number)
  limit?: number = 10

  @IsOptional()
  status?: OrderStatus

  @IsOptional()
  @IsString()
  search?: string
}
