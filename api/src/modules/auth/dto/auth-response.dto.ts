import { ApiProperty } from "@nestjs/swagger"
import { Role } from "src/generated/prisma/enums"

export class AuthResponseDto {
  @ApiProperty({
    description: 'Access token for authentication',
    example:
      '8059f0344dddcb6f6d35b11ffe75307b8661a8e366b969c2b87ec1cc537a1b2cd20a6bd874d744cfdc05cc429fd3a316661fd9a5d5ecb2b8e8b54d852fb8a090798f3084261e09eb4fa83eebc3516c0b7432e45916967998541a01fea10cda3b64182f662c189df3104d50ee030caf567da77cda0c1b4dce0cf36f1e797c7e7a'
  })
  accessToken!: string

  @ApiProperty({
    description: 'Refresh token for obtaining new access token',
    example:
      'e44c6920fc5cef6bf41d911b453f177f8397c520998ec741363efbde3585f2d15e263ae8df8ed16c356858038c56352f4a86c687824753658cc632aa93b3f090'
  })
  refreshToken!: string

  @ApiProperty({
    description: 'Authenticated user information',
    example: {
      id: 'user-123',
      email: '<EMAIL>',
      firstName: 'John',
      lastName: 'Doe',
      role: 'USER'
    }
  })
  user!: {
    id: string,
    email: string,
    firstName: string | null,
    lastName: string | null,
    role: Role
  }
}
