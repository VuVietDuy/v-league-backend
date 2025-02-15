import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSeasonDto } from './dto/create-season.dto';

@Injectable()
export class SeasonsService {
  constructor(private prisma: PrismaService) {}

  create(createSeasonDto: CreateSeasonDto) {
    return this.prisma.season.create({ data: createSeasonDto });
  }

  findAll(where?: any) {
    return this.prisma.season.findMany({ where: where });
  }

  findOne(where?: any) {
    return this.prisma.season.findFirst({
      where: {
        tournamentId: where.tournamentId,
        isActive: true,
      },
    });
  }

  findById(id: number) {
    return this.prisma.season.findUnique({ where: { id } });
  }

  delete(id: number) {
    return this.prisma.season.delete({
      where: { id },
    });
  }

  unActiveSeasons(tournamentId: string) {
    return this.prisma.season.updateMany({
      where: {
        tournamentId: tournamentId,
        isActive: true,
      },
      data: {
        isActive: false,
      },
    });
  }

  addSeasonClubs(seasonId: number, clubIds: number[]) {
    const seasonClubs = clubIds.map((clubId) => ({
      seasonId,
      clubId,
    }));

    return this.prisma.seasonClub.createMany({
      data: seasonClubs,
      skipDuplicates: true,
    });
  }

  getSeasonClubs(seasonId: number, key: string) {
    let where = {};
    where = {
      ...where,
      seasonClubs: {
        some: {
          seasonId: seasonId,
        },
      },
    };
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
    });
  }

  getListSeasons(tournamentId: string) {
    return this.prisma.season.findMany({
      where: {
        tournamentId: tournamentId,
      },
    });
  }
}
