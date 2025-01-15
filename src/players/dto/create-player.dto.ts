import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsInt,
  IsPositive,
  IsUrl,
} from 'class-validator';

export class CreatePlayerDto {
  @IsString()
  @IsNotEmpty({ message: 'Tên cầu thủ là bắt buộc.' })
  @ApiProperty({
    type: 'string',
    description: 'Tên cầu thủ',
    default: 'Nguyen Van A',
  })
  name: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Hinh anh cau thu',
  })
  image: Express.Multer.File;

  @IsUrl({}, { message: 'URL hình ảnh không hợp lệ.' })
  imageURL: string;

  @IsString()
  @IsNotEmpty({ message: 'Quốc tịch là bắt buộc.' })
  @ApiProperty({
    type: 'string',
    description: 'Quoc tich',
    default: 'Viet Nam',
  })
  nationality: string;

  @ApiProperty({
    type: 'string',
    description: 'Ngày sinh (định dạng ISO 8601)',
    example: '2001-10-10T00:00:00.000Z',
  })
  @IsDateString(
    {},
    {
      message:
        'Ngày sinh phải đúng định dạng ISO 8601 (VD: 2001-10-10T00:00:00.000Z).',
    },
  )
  @IsNotEmpty({ message: 'Ngày sinh là bắt buộc.' })
  dateOfBirth: string;

  @IsPositive({ message: 'Chiều cao phải là một số dương.' })
  @ApiProperty({
    type: 'number',
    description: 'Chiều cao cầu thủ (cm)',
    default: 180,
  })
  height: number;
  weight: number;

  @IsString()
  @IsNotEmpty({ message: 'Vị trí là bắt buộc.' })
  @ApiProperty({
    type: 'string',
    description: 'Vị trí thi đấu',
    default: 'Tiền vệ',
  })
  position: string;

  @IsInt({ message: 'clubId phải là một số nguyên.' })
  @IsPositive({ message: 'clubId phải lớn hơn 0.' })
  @ApiProperty({
    type: 'number',
    description: 'Id câu lạc bộ',
    default: 1,
  })
  clubId?: number;
  shirtNumber: number;
}
