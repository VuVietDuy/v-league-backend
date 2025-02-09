import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from '@prisma/client';

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

  @ApiPropertyOptional({
    description: 'Giới tính của người dùng',
    example: 'male',
    enum: ['male', 'female', 'other'],
    type: String,
  })
  gender?: string;

  @ApiPropertyOptional({
    description: 'Ngày sinh của người dùng (YYYY-MM-DD)',
    example: '1990-01-01',
    type: String,
  })
  dateOfBirth?: string;

  @ApiPropertyOptional({
    description: 'ID của câu lạc bộ yêu thích',
    example: 1,
    type: Number,
  })
  favouriteClubId?: number;

  @ApiProperty({
    description: 'Vai trò của người dùng',
    example: 'USER',
    enum: Role,
    type: String,
  })
  role: Role;
}
