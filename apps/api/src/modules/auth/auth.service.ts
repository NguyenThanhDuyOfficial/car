import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from '@car/shared';


@Injectable()
export class AuthService {
  constructor(private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService) { }

  async register(createUserDto: CreateUserDto): Promise<{ access_token: string, refresh_token: string }> {
    const existingUser = await this.userService.findByUsername({ username: createUserDto.username })
    if (existingUser) throw new Error('Username already exists')

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10)

    const user = await this.userService.create({ username: createUserDto.username, password: hashedPassword }
    )

    return this.generateTokens(user)
  }

  async generateTokens(user: any): Promise<{ access_token: string, refresh_token: string }> {
    const payload = { sub: user.id, username: user.username, email: user.email }
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get("JWT_SECRET"),
        expiresIn: this.configService.get("JWT_EXPIRES_IN", "1h")
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get("JWT_REFRESH_SECRET"),
        expiresIn: this.configService.get("JWT_REFRESH_EXPIRES_IN", "7d")
      }),
    ])
    return { access_token, refresh_token }
  }

}
