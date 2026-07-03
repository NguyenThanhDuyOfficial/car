import { ApiProperty } from "@nestjs/swagger";
import { Role } from "src/generated/prisma/enums";

export class UserResponseDto {
  @ApiProperty({ description: 'User ID', example: '123' })
  id?: string

  @ApiProperty({ description: 'User email address', example: 'user@example.com' })
  email?: string

  @ApiProperty({ description: 'User first name', example: 'John' })
  firstName?: string | null

  @ApiProperty({ description: 'User last name', example: 'Doe' })
  lastName?: string | null

  @ApiProperty({ description: 'User role', enum: Role })
  role!: Role

  @ApiProperty({ description: 'Account creation date', example: '2023-10-01T12:35:56.789Z' })
  createdAt?: Date

  @ApiProperty({ description: "Last account update date", example: '2023-10-01T12:35:56.789Z' })
  updatedAt?: Date
} 
