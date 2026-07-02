import { BadRequestException, ConflictException, Controller, Get, HttpCode, HttpStatus, Post, Body } from '@nestjs/common';
import { CreateUserDto } from '@car/shared';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      const result = await this.authService.register(createUserDto)
      return {
        success: true,
        message: "User registered successfully",
        data: result
      };
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error
      }
      throw new BadRequestException()
    }
  }

}
