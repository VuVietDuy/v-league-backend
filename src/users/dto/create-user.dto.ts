import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Email của người dùng',
    example: 'user@example.com',
    type: String,
  })
  email: string;

  @ApiProperty({
    description: 'Tên của người dùng',
    example: 'John Doe',
    type: String,
  })
  name: string;

  @ApiProperty({
    description: 'Mật khẩu của người dùng',
    example: 'StrongPassword123!',
    type: String,
    minLength: 8,
  })
  password: string;

  @ApiProperty({
    description: 'Vai trò của người dùng',
    example: 'admin',
    enum: ['user', 'admin'],
    type: String,
  })
  role: string;
}
