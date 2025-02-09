import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { contains } from 'class-validator';

@Injectable()
export class PlayersService {
  constructor(private prisma: PrismaService) {}

  create(createPlayerDto: CreatePlayerDto) {
    return this.prisma.player.create({ data: createPlayerDto });
  }

  findAll(key: string, clubId: number) {
    let where = {};
    if (key) {
      where = { ...where, name: { contains: key } };
    }
    if (clubId) {
      where = { ...where, clubId: clubId };
    }
    return this.prisma.player.findMany({
      where: where,
      include: {
        club: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.player.findUnique({
      where: { id },
      include: {
        club: {
          include: {},
        },
      },
    });
  }

  update(id: number, updatePlayerDto: UpdatePlayerDto) {
    return this.prisma.player.update({
      where: { id },
      data: updatePlayerDto,
    });
  }

  delete(id: number) {
    return this.prisma.player.delete({ where: { id } });
  }
}
