import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Role } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  findAll(key: string, role: Role) {
    return this.prisma.user.findMany({
      where: {
        name: {
          contains: key,
        },
        role: role,
      },
    });
  }

  findOne(where: any) {
    return this.prisma.user.findUnique({ where });
  }

  // create(createUserDto: CreateUserDto) {
  //   return this.prisma.user.create({ data: createUserDto });
  // }

  delete(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }

  getProfile(userId: number) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        favouriteClub: true,
      },
    });
  }

  updateProfile(userId: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id: userId },
      data: updateUserDto,
    });
  }
}
