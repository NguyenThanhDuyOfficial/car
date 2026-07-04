import { PartialType } from "@nestjs/swagger"
import { CreateCarDto } from "./create-car.dto"

export class UpdateCarDTo extends PartialType(CreateCarDto) { }
