import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class MatchesService {
  constructor(private prisma: PrismaService) {}
  create(createMatchDto: CreateMatchDto) {
    return this.prisma.match.create({ data: createMatchDto });
  }

  findAll() {
    return this.prisma.match.findMany({
      include: {
        awayClub: true,
        homeClub: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.match.findUnique({
      where: { id },
      include: {
        awayClub: true,
        homeClub: true,
        events: {
          include: {
            player: true,
          },
        },
      },
    });
  }

  addEvent(createEventDto: CreateEventDto) {
    return this.prisma.event.create({ data: createEventDto });
  }
}
