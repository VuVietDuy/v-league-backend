import { Gender, Role } from '@prisma/client';
import {
  IsString,
  IsEmail,
  IsEnum,
  IsOptional,
  IsInt,
  IsDate,
} from 'class-validator';

export class SignupDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsEnum(Gender)
  gender: Gender;

  @IsDate()
  dateOfBirth: Date;

  @IsEnum(Role)
  role: Role;

  @IsOptional()
  @IsInt()
  favouriteClub: {
    connect: { id: number };
  };
}
