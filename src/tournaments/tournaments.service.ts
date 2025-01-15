import { Injectable } from '@nestjs/common';
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

  findOne(id: string) {
    return this.prisma.tournament.findUnique({ where: { id } });
  }

  update(id: string, updateTournamentDto: UpdateTournamentDto) {
    return this.prisma.tournament.update({
      where: { id },
      data: updateTournamentDto,
    });
  }

  delete(id: string) {
    return this.prisma.tournament.delete({
      where: { id },
    });
  }

  getMatches(tournamentId: string, where: any = null) {
    return this.prisma.match.findMany({
      where: {
        season: {
          tournamentId: tournamentId,
          isActive: true,
        },
        ...where,
      },
      include: {
        homeClub: true,
        awayClub: true,
        season: true,
      },
      orderBy: {
        date: 'asc',
      },
    });
  }

  async getDashboard(tournamentId: string) {
    const totalMatches = await this.prisma.match.count({
      where: {
        season: {
          tournamentId: tournamentId,
        },
      },
    });

    const tables = await this.getTables(tournamentId);

    const topScorer = await tables.reduce((max, current) => {
      return current.point > max.point ? current : max;
    });

    return {
      data: {
        topScorer,
        totalMatches,
        tables,
      },
    };
  }

  getClubs(tournamentId: string) {
    return this.prisma.club.findMany({
      where: {
        seasonClubs: {
          some: {
            season: {
              tournamentId,
              isActive: true,
            },
          },
        },
      },
    });
  }

  async getTables(tournamentId: string) {
    const clubs = await this.prisma.club.findMany({
      where: {
        seasonClubs: {
          some: {
            season: {
              tournamentId: tournamentId,
              isActive: true,
            },
          },
        },
      },
      include: {
        homeMatches: {
          where: {
            season: {
              tournamentId: tournamentId,
            },
          },
        },
        awayMatches: {
          where: {
            season: {
              tournamentId: tournamentId,
            },
          },
        },
      },
    });

    const tables = [];

    clubs.map((club) => {
      let won = 0;
      let lost = 0;
      let drawn = 0;
      let played = 0;
      let goalsFor = 0;
      let goalsAgainst = 0;

      club.homeMatches.map((match) => {
        if (match.status === 'Completed') {
          played++;
          goalsFor += match.homeScore;
          goalsAgainst += match.awayScore;
          if (match.homeScore > match.awayScore) {
            won++;
          } else if (match.homeScore < match.awayScore) {
            lost++;
          } else {
            drawn++;
          }
        }
      });

      club.awayMatches.map((match) => {
        if (match.status === 'Completed') {
          played++;
          goalsFor += match.awayScore;
          goalsAgainst += match.homeScore;
          if (match.awayScore > match.homeScore) {
            won++;
          } else if (match.awayScore < match.homeScore) {
            lost++;
          } else {
            drawn++;
          }
        }
      });
      let points = won * 3 + drawn;

      const tablesItem = {
        club: {
          id: club.id,
          name: club.name,
          shortName: club.shortName,
          stadium: club.stadium,
          stadiumDescription: club.stadiumDescription,
          coach: club.coach,
          logoURL: club.logoURL,
          foundedYear: club.foundedYear,
        },
        played,
        won,
        drawn,
        lost,
        goalsFor,
        goalsAgainst,
        goalDifference: goalsFor - goalsAgainst,
        points,
      };
      tables.push(tablesItem);
    });

    return tables;
  }
}
