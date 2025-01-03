import { Injectable } from '@nestjs/common';
import { Tournament } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';

@Injectable()
export class TournamentsService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateTournamentDto) {
    return this.prisma.tournament.create({ data: data });
  }

  findAll() {
    return this.prisma.tournament.findMany();
  }

  findOne(id: number) {
    return this.prisma.tournament.findUnique({ where: { id } });
  }

  update(id: number, updateTournamentDto: UpdateTournamentDto) {
    return this.prisma.tournament.update({
      where: { id },
      data: updateTournamentDto,
    });
  }

  delete(id: number) {
    return this.prisma.tournament.delete({
      where: { id },
    });
  }
}
