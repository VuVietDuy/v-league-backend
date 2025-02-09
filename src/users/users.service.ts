import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from '@prisma/client';

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
}
