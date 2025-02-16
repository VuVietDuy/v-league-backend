import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';

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
        club: true,
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

  async getPlayerStats(playerId: number) {
    const player = await this.prisma.player.findUnique({
      where: {
        id: playerId,
      },
      include: {
        events: true,
        assists: true,
        club: {
          include: {
            homeMatches: true,
            awayMatches: true,
          },
        },
      },
    });

    let shots = 0;
    let goals = 0;
    let assists = player.assists.length;
    let appearances = player.club.homeMatches.length;
    let wins =
      player.club.homeMatches.filter(
        (match) => match.homeScore > match.awayScore,
      ).length +
      player.club.awayMatches.filter(
        (match) => match.homeScore < match.awayScore,
      ).length;
    let losses =
      player.club.homeMatches.filter(
        (match) => match.homeScore < match.awayScore,
      ).length +
      player.club.awayMatches.filter(
        (match) => match.homeScore > match.awayScore,
      ).length;
    let goalsConceded = 0;
    let cleanSheets = 0;
    let shotsOnTarget = 0;
    let saves = 0;
    let yellowCard = 0;
    let redCard = 0;
    let keyPass = 0;

    player.club.homeMatches.forEach((match) => {
      if (match.awayScore < match.homeScore) {
        wins++;
      } else if (match.awayScore > match.homeScore) {
        losses++;
      }
      if (match.homeScore === 0) {
        cleanSheets++;
      }
    });

    player.club.awayMatches.forEach((match) => {
      if (match.awayScore > match.homeScore) {
        wins++;
      } else if (match.awayScore < match.homeScore) {
        losses++;
      }
      if (match.homeScore === 0) {
        cleanSheets++;
      }
    });

    player.events.forEach((event) => {
      if (event.eventType === 'GOAL') {
        goals++;
      }
      if (event.eventType === 'GOAL') {
        goals++;
      }

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

    delete player.club.homeMatches;
    delete player.club.awayMatches;
    delete player.events;
    delete player.assists;

    const data = {
      ...player,
      appearances,
      shots,
      shootingAccuracy: Math.round((shotsOnTarget / shots) * 100),
      goals,
      goalPerMatch: Math.round((goals / appearances) * 100) / 100,
      assists,
      wins,
      losses,
      goalsConceded,
      cleanSheets,
      shotsOnTarget,
      saves,
      yellowCard,
      redCard,
      keyPass,
    };
    return data;
  }
}
