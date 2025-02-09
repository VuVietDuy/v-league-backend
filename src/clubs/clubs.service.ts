import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';
import { contains } from 'class-validator';

@Injectable()
export class ClubsService {
  constructor(private prisma: PrismaService) {}

  create(createClubDto: CreateClubDto) {
    return this.prisma.club.create({ data: createClubDto });
  }

  findAll(key: string) {
    let where = {};
    if (key) {
      where = {
        ...where,
        name: {
          contains: key,
        },
      };
    }
    return this.prisma.club.findMany({
      where: where,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  findOne(id: number) {
    return this.prisma.club.findUnique({
      where: { id },
      include: {
        players: true,
      },
    });
  }

  update(id: number, updateClubDto: UpdateClubDto) {
    return this.prisma.club.update({
      where: {
        id,
      },
      data: updateClubDto,
    });
  }

  delete(id: number) {
    return this.prisma.club.delete({
      where: { id },
    });
  }

  findMatchesByClubId(id: number) {
    return this.prisma.match.findMany({
      where: {
        OR: [{ homeClubId: id }, { awayClubId: id }],
        season: {
          isActive: true,
        },
      },
      include: {
        homeClub: true,
        awayClub: true,
      },
    });
  }
}
