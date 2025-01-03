import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signup.dto';

@Injectable({})
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<any> {
    const user = await this.usersService.findOne({ email: loginDto.email });

    if (user?.password !== loginDto.password) {
      throw new UnauthorizedException();
    }

    const payload = { userId: user.id };
    return {
      user: user,
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signup(signupDto: SignupDto) {
    const user = await this.usersService.create({ ...signupDto, role: 'user' });
    const payload = { userId: user.id };
    return {
      user: user,
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
