import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TablesService {
  constructor(private prisma: PrismaService) {}
  async getTables(tournamentId: number) {
    const season = await this.prisma.season.findFirst({
      where: {},
    });
    const matches = await this.prisma.match.findMany({
      where: {
        season: {},
      },
    });
  }
}
