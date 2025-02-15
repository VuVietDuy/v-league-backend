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

  getMatches(tournamentId: string, where: any = null, seasonId: number = null) {
    let season = {};
    if (seasonId) {
      season = {
        id: seasonId,
      };
    } else {
      season = {
        tournamentId: tournamentId,
        isActive: true,
      };
    }
    return this.prisma.match.findMany({
      where: {
        AND: [
          {
            season: season,
          },
          ...where,
        ],
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

  getResults(tournamentId: string, where: any = null) {
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
        date: 'desc',
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
              isActive: true,
            },
          },
          include: {
            homeClub: true,
            awayClub: true,
          },
        },
        awayMatches: {
          where: {
            season: {
              tournamentId: tournamentId,
              isActive: true,
            },
          },
          include: {
            homeClub: true,
            awayClub: true,
          },
        },
      },
    });

    let tables = [];

    clubs.map((club) => {
      let won = 0;
      let lost = 0;
      let drawn = 0;
      let played = 0;
      let goalsFor = 0;
      let goalsAgainst = 0;

      club.homeMatches.map((match) => {
        if (match.status === 'COMPLETED') {
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
        if (match.status === 'COMPLETED') {
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
      let form = [...club.homeMatches, ...club.awayMatches];
      form = form
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .slice(0, 5);

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
        form,
      };
      tables.push(tablesItem);
    });

    tables.sort((a, b) => b.points - a.points);

    tables = tables.map((item, index) => ({
      position: index + 1,
      ...item,
    }));

    return tables;
  }

  getSeasons(tournamentId: string) {
    this.prisma.season.findMany({
      where: {
        tournamentId: tournamentId,
      },
    });
  }
}
