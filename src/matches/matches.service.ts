import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { CreateEventDto } from './dto/create-event.dto';
import { CreateLineupsDto } from './dto/create-lineups.dto';
import { EventType } from '@prisma/client';
import { CreateVoteDto } from './dto/create-vote.dto';
import { MatchImageDto } from './dto/match-image.dto';

@Injectable()
export class MatchesService {
  constructor(private prisma: PrismaService) {}
  async create(createMatchDto: CreateMatchDto) {
    const match = await this.prisma.match.create({
      data: createMatchDto,
      include: {
        homeClub: {
          include: {
            players: true,
          },
        },
        awayClub: {
          include: {
            players: true,
          },
        },
      },
    });

    match.homeClub.players.map(async (player) => {
      await this.prisma.lineup.create({
        data: {
          matchId: match.id,
          clubId: match.homeClubId,
          playerId: player.id,
          isStarting: false,
        },
      });
    });

    match.awayClub.players.map(async (player) => {
      await this.prisma.lineup.create({
        data: {
          matchId: match.id,
          clubId: match.awayClubId,
          playerId: player.id,
          isStarting: false,
        },
      });
    });

    return match;
  }

  async findAll(tournamentId: string, seasonId: number) {
    if (seasonId === 0) {
      const season = await this.prisma.season.findFirst({
        where: {
          tournamentId: tournamentId,
        },
      });

      seasonId = season.id;
    }

    const matches = await this.prisma.match.findMany({
      where: {
        seasonId: seasonId,
      },
      include: {
        awayClub: true,
        homeClub: true,
      },
      orderBy: {
        date: 'desc',
      },
    });

    return matches;
  }

  findOne(id: number) {
    return this.prisma.match.findUnique({
      where: { id },
      include: {
        awayClub: {
          include: {
            players: true,
          },
        },
        homeClub: {
          include: {
            players: true,
          },
        },
        events: {
          include: {
            club: true,
            player: true,
            assist: true,
          },
        },
      },
    });
  }

  getMatchEvents(
    id: number,
    clubId: number = null,
    eventType: EventType = null,
  ) {
    let eventFilter = [];
    if (clubId) eventFilter.push({ clubId });
    if (eventType) eventFilter.push({ eventType });
    return this.prisma.match.findUnique({
      where: {
        id: id,
      },
      include: {
        awayClub: {
          include: {
            players: true,
          },
        },
        homeClub: {
          include: {
            players: true,
          },
        },
        events: {
          where: {
            AND: eventFilter,
          },
          include: {
            club: true,
            player: true,
            assist: true,
          },
          orderBy: {
            eventTime: 'asc',
          },
        },
      },
    });
  }

  createMatchLineups(data: CreateLineupsDto[]) {
    const res = data.map(async (lineup) => {
      await this.prisma.lineup.update({
        where: {
          id: lineup.id,
        },
        data: {
          isStarting: lineup.isStarting,
        },
      });
    });
    return res;
  }

  async addEvent(createEventDto: CreateEventDto) {
    let match = await this.prisma.match.findUnique({
      where: {
        id: createEventDto.matchId,
      },
    });
    if (createEventDto.eventType === 'GOAL') {
      if (match.homeClubId === createEventDto.clubId) {
        match.homeScore++;
      }
      if (match.awayClubId === createEventDto.clubId) {
        match.awayScore++;
      }
    }

    if (createEventDto.eventType === 'START') {
      match.status = 'ONGOING';
      createEventDto.clubId = null;
      createEventDto.playerId = null;
      createEventDto.assistId = null;
    }
    if (createEventDto.eventType === 'FINISH') {
      match.status = 'COMPLETED';
      createEventDto.clubId = null;
      createEventDto.playerId = null;
      createEventDto.assistId = null;
    }

    match = await this.prisma.match.update({
      data: match,
      where: {
        id: match.id,
      },
    });
    const event = await this.prisma.event.create({ data: createEventDto });
    return {
      event,
      match,
    };
  }

  async getListEvents(matchId: number) {
    return this.prisma.match.findUnique({
      where: { id: matchId },
      include: {
        awayClub: true,
        homeClub: true,
        events: {
          include: {
            club: true,
            player: true,
            assist: true,
          },
        },
      },
    });
  }

  async getMatchLineups(matchId: number) {
    const match = await this.prisma.match.findUnique({
      where: {
        id: matchId,
      },
      include: {
        homeClub: true,
        awayClub: true,
      },
    });

    const homeClubLineups = await this.prisma.lineup.findMany({
      where: {
        matchId: matchId,
        clubId: match.homeClubId,
      },
      include: {
        player: true,
      },
    });

    const awayClubLineups = await this.prisma.lineup.findMany({
      where: {
        matchId: matchId,
        clubId: match.awayClubId,
      },
      include: {
        player: true,
      },
    });

    return { match, homeClubLineups, awayClubLineups };
  }

  async getPlayersStats(matchId: number) {
    const match = await this.prisma.match.findUnique({
      where: {
        id: matchId,
      },
      include: {
        homeClub: {
          include: {
            players: {
              include: {
                events: {
                  where: { matchId: matchId },
                },
                assists: {
                  where: { matchId: matchId },
                },
                votes: {
                  where: {
                    matchId: matchId,
                  },
                },
              },
            },
          },
        },
        awayClub: {
          include: {
            players: {
              include: {
                events: {
                  where: { matchId: matchId },
                },
                assists: {
                  where: { matchId: matchId },
                },
                votes: {
                  where: {
                    matchId: matchId,
                  },
                },
              },
            },
          },
        },
      },
    });

    const players = [...match.homeClub.players, ...match.awayClub.players];
    let playersStat = players.map((player) => {
      return {
        ...player,
        goals: player.events.filter((event) => event.eventType === 'GOAL')
          .length,
        assists: player.assists.length,
        shots: player.events.filter((event) => event.eventType === 'SHOTS')
          .length,
        shotsOnTarget: player.events.filter(
          (event) => event.eventType === 'SHOTS_ON_TARGET',
        ).length,
        keyPasses: player.events.filter(
          (event) => event.eventType === 'KEY_PASSES',
        ).length,
        successfulDribbles: player.events.filter(
          (event) => event.eventType === 'SUCCESSFUL_DRIBBLES',
        ).length,
        yellowCards: player.events.filter(
          (event) => event.eventType === 'YELLOW_CARD',
        ).length,
        redCards: player.events.filter(
          (event) => event.eventType === 'RED_CARD',
        ).length,
        saves: player.events.filter((event) => event.eventType === 'SAVE')
          .length,
      };
    });

    return playersStat;
  }

  async getVotes(matchId: number) {
    const match = await this.prisma.match.findUnique({
      where: {
        id: matchId,
      },
      include: {
        homeClub: {
          include: {
            players: {
              include: {
                votes: {
                  where: {
                    matchId: matchId,
                  },
                },
                events: {
                  where: { matchId: matchId },
                },
                assists: {
                  where: { matchId: matchId },
                },
                club: true,
              },
            },
          },
        },
        awayClub: {
          include: {
            players: {
              include: {
                votes: {
                  where: {
                    matchId: matchId,
                  },
                },
                events: {
                  where: { matchId: matchId },
                },
                assists: {
                  where: { matchId: matchId },
                },
                club: true,
              },
            },
          },
        },
      },
    });

    let players = [...match.homeClub.players, ...match.awayClub.players];

    const totalVotes = await this.prisma.vote.count({
      where: {
        matchId: matchId,
      },
    });

    let playersVote = players.map((player, index) => ({
      ...player,
      voteCount: player.votes.length,
      votePercen:
        totalVotes === 0
          ? 0
          : Math.round((player.votes.length / totalVotes) * 100),
      goals: player.events.filter((event) => event.eventType === 'GOAL').length,
      assists: player.assists.length,
      shots: player.events.filter((event) => event.eventType === 'SHOTS')
        .length,
      shotsOnTarget: player.events.filter(
        (event) => event.eventType === 'SHOTS_ON_TARGET',
      ).length,
      keyPasses: player.events.filter(
        (event) => event.eventType === 'KEY_PASSES',
      ).length,
      successfulDribbles: player.events.filter(
        (event) => event.eventType === 'SUCCESSFUL_DRIBBLES',
      ).length,
      yellowCards: player.events.filter(
        (event) => event.eventType === 'YELLOW_CARD',
      ).length,
      redCards: player.events.filter((event) => event.eventType === 'RED_CARD')
        .length,
      saves: player.events.filter((event) => event.eventType === 'SAVE').length,
    }));

    playersVote.sort((a, b) => {
      if (b.votePercen !== a.votePercen) return b.votePercen - a.votePercen; // Phần trăm vote cao hơn
      if (b.voteCount !== a.voteCount) return b.voteCount - a.voteCount; // Số phiếu nhiều hơn
      if (b.goals !== a.goals) return b.goals - a.goals; // Bàn thắng nhiều hơn
      if (b.assists !== a.assists) return b.assists - a.assists; // Kiến tạo nhiều hơn
      if (b.keyPasses !== a.keyPasses) return b.keyPasses - a.keyPasses; // Key pass nhiều hơn
      if (a.shirtNumber && b.shirtNumber) return a.shirtNumber - b.shirtNumber; // Số áo nhỏ hơn
      return a.name.localeCompare(b.name); // Tên theo bảng chữ cái
    });

    playersVote = playersVote.map((item, index) => ({
      ...item,
      pos: index + 1,
    }));

    return { playersVote, totalVotes };
  }

  createVote(createVoteDto: CreateVoteDto) {
    return this.prisma.vote.create({ data: createVoteDto });
  }

  addMatchImage(matchImageDto: MatchImageDto) {
    return this.prisma.matchImage.create({
      data: matchImageDto,
    });
  }

  getMatchImages(matchId: number) {
    return this.prisma.matchImage.findMany({
      where: {
        matchId: matchId,
      },
    });
  }

  async getMatchStats(matchId: number) {
    const match = await this.prisma.match.findUnique({
      where: {
        id: matchId,
      },
      include: {
        homeClub: true,
        awayClub: true,
        events: true,
      },
    });

    const data = {
      homeClub: {
        ...match.homeClub,
        possession: 57.7,
        shotsOnTargett: match.events.filter(
          (event) =>
            event.eventType === 'SHOTS_ON_TARGET' &&
            event.clubId === match.homeClubId,
        ).length,
        shots: match.events.filter(
          (event) =>
            event.eventType === 'SHOTS' && event.clubId === match.homeClubId,
        ).length,
        touches: 723,
        passes: 363,
        corners: 34,
        yellowCards: match.events.filter(
          (event) =>
            event.eventType === 'YELLOW_CARD' &&
            event.clubId === match.homeClubId,
        ).length,
        redCards: match.events.filter(
          (event) =>
            event.eventType === 'RED_CARD' && event.clubId === match.homeClubId,
        ).length,
        foulsConceded: match.events.filter(
          (event) =>
            event.eventType === 'OWN_GOAL' && event.clubId === match.homeClubId,
        ).length,
      },
      awayClub: {
        ...match.awayClub,
        possession: 57.7,
        shots: match.events.filter(
          (event) =>
            event.eventType === 'SHOTS' && event.clubId === match.awayClubId,
        ).length,
        shotsOnTargett: match.events.filter(
          (event) =>
            event.eventType === 'SHOTS_ON_TARGET' &&
            event.clubId === match.awayClubId,
        ).length,
        touches: 723,
        passes: 363,
        corners: 34,
        yellowCards: match.events.filter(
          (event) =>
            event.eventType === 'YELLOW_CARD' &&
            event.clubId === match.awayClubId,
        ).length,
        redCards: match.events.filter(
          (event) =>
            event.eventType === 'RED_CARD' && event.clubId === match.awayClubId,
        ).length,
        foulsConceded: match.events.filter(
          (event) =>
            event.eventType === 'OWN_GOAL' && event.clubId === match.awayClubId,
        ).length,
      },
    };

    return data;
  }

  deleteEvent(eventId: number) {
    return this.prisma.event.delete({
      where: {
        id: eventId,
      },
    });
  }
}
