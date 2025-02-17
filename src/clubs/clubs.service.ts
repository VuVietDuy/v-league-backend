import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';
import { contains } from 'class-validator';
import { PlayersService } from 'src/players/players.service';

@Injectable()
export class ClubsService {
  constructor(
    private prisma: PrismaService,
    private playersService: PlayersService,
  ) {}

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

  async findOne(id: number) {
    let club = await this.prisma.club.findUnique({
      where: { id },
    });
    const players = await this.prisma.player.findMany({
      where: {
        clubId: club.id,
      },
    });
    club['players'] = [];
    for (const player of players) {
      const playerData = await this.playersService.getPlayerStats(player.id);
      club['players'].push(playerData);
    }

    return club;
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

  async getClubStats(clubId: number, seasonWhere: any) {
    const club = await this.prisma.club.findUnique({
      where: {
        id: clubId,
      },
      include: {
        homeMatches: {
          where: seasonWhere,
          include: {
            events: true,
          },
        },
        awayMatches: {
          where: seasonWhere,
          include: {
            events: true,
          },
        },
      },
    });

    let matchesPlayed = 0;
    let wins = 0;
    let losses = 0;
    let goals = 0;
    let goalsConceded = 0;
    let cleanSheets = 0;
    let shots = 0;
    let shotsOnTarget = 0;
    let saves = 0;
    let yellowCard = 0;
    let redCard = 0;
    let keyPass = 0;

    club.homeMatches.forEach((match) => {
      matchesPlayed++;
      goals += match.homeScore;
      goalsConceded += match.awayScore;
      if (match.homeScore > match.awayScore) {
        wins++;
      } else if (match.homeScore < match.awayScore) {
        losses++;
      }
      if (match.awayScore === 0) {
        cleanSheets++;
      }
      match.events.forEach((event) => {
        if (event.clubId !== club.id) return;

        if (event.eventType === 'SHOTS') {
          shots++;
        }

        if (event.eventType === 'SHOTS_ON_TARGET') {
          shotsOnTarget++;
        }

        if (event.eventType === 'KEY_PASSES') {
          keyPass++;
        }

        if (event.eventType === 'SAVE') {
          saves++;
        }

        if (event.eventType === 'YELLOW_CARD') {
          yellowCard++;
        }

        if (event.eventType === 'RED_CARD') {
          redCard++;
        }
      });
    });

    club.awayMatches.forEach((match) => {
      matchesPlayed++;
      goals += match.awayScore;
      goalsConceded += match.homeScore;
      if (match.awayScore > match.homeScore) {
        wins++;
      } else if (match.awayScore < match.homeScore) {
        losses++;
      }
      if (match.homeScore === 0) {
        cleanSheets++;
      }
      match.events.forEach((event) => {
        if (event.clubId !== club.id) return;

        if (event.eventType === 'SHOTS') {
          shots++;
        }

        if (event.eventType === 'SHOTS_ON_TARGET') {
          shotsOnTarget++;
        }

        if (event.eventType === 'KEY_PASSES') {
          keyPass++;
        }

        if (event.eventType === 'SAVE') {
          saves++;
        }

        if (event.eventType === 'YELLOW_CARD') {
          yellowCard++;
        }

        if (event.eventType === 'RED_CARD') {
          redCard++;
        }
      });
    });

    const data = {
      id: club.id,
      name: club.name,
      shortName: club.shortName,
      stadium: club.stadium,
      stadiumDescription: club.stadiumDescription,
      coach: club.coach,
      logoURL: club.logoURL,
      foundedYear: club.foundedYear,
      matchesPlayed: matchesPlayed,
      wins: wins,
      losses: losses,
      goals: goals,
      goalsConceded: goalsConceded,
      cleanSheets: cleanSheets,
      attack: {
        goals: goals,
        goalsPerMatch: Math.round((goals / matchesPlayed) * 100) / 100,
        shots: shots,
        bigChancesCreated: 21,
        shotsOnTarget: shotsOnTarget,
        shootingAccuracy: Math.round((shotsOnTarget / shots) * 100),
        keyPass: keyPass,
      },
      teamPlay: {
        passes: matchesPlayed * 1.5,
        passesPerMatch: 1.5,
        passAccuracy: 79,
        crosses: goals * 2,
        crossAccuracy: 21,
      },
      defence: {
        cleanSheets: cleanSheets,
        goalsConceded: goalsConceded,
        goalsConcededPermatch:
          Math.round((goalsConceded / matchesPlayed) * 100) / 100,
        ownGoals: 0,
        saves: saves,
      },
      discipline: {
        yellowCard: yellowCard,
        redCard: redCard,
        fouls: 421,
        offsides: 10,
      },
    };

    return data;
  }
}
