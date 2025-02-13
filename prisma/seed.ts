import { fakerVI } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import { clubData } from './clubData';
import {
  generatePlayerData,
  generatePlayerDataCAHN,
  generatePlayerDataDATH,
  generatePlayerDataHAGL,
  generatePlayerDataHCMFC,
  generatePlayerDataHLHT,
  generatePlayerDataHPFC,
  generatePlayerDataQNFC,
  generatePlayerDataSLNA,
  generatePlayerDataTXND,
} from './playerData';
import { newsData } from './newsData';

const prisma = new PrismaClient();

function generateComment(eventType: string): string {
  const comments: Record<string, string> = {
    GOAL: 'Tuyệt vời! Một bàn thắng đẳng cấp! ⚽',
    YELLOW_CARD: 'Trọng tài rút thẻ vàng cảnh cáo! 🟨',
    RED_CARD: 'Thẻ đỏ! Cầu thủ phải rời sân ngay lập tức! 🟥',
    SUBSTITUTION: 'Có sự thay đổi người trên sân! 🔄',
    SHOTS: 'Một cú sút! Liệu có thành bàn? 🎯',
    SHOTS_ON_TARGET: 'Cú sút nguy hiểm nhưng thủ môn đã cản phá! 🎯✅',
    BIG_CHANCES_CREATED: 'Cơ hội ngon ăn! Nhưng liệu có tận dụng được? 🎁',
    KEY_PASSES: 'Một đường chuyền mở ra cơ hội tấn công! 🔑',
    SUCCESSFUL_DRIBBLES: 'Pha đi bóng đầy kỹ thuật qua hậu vệ! 🏃💨',
    SAVE: 'Thủ môn phản xạ xuất thần để cứu thua! 🧤',
  };

  return comments[eventType] || 'Sự kiện chưa được xác định!';
}

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: 'admin@vleague.com' },
    update: {},
    create: {
      email: 'admin@vleague.com',
      name: 'Adminstrator',
      password: '12345678',
      dateOfBirth: '2001-10-10T10:00:00Z',
      gender: 'MALE',
      role: 'ADMIN',
    },
  });

  await prisma.tournament.createMany({
    data: [
      {
        id: 'vleague-1',
        vietNamName: 'GIẢI BÓNG ĐÁ VÔ ĐỊCH QUỐC GIA',
        englishName: 'LPBANK V.LEAGUE 1',
        description: 'Giải đấu bóng đá chuyên nghiệp hàng đầu Việt Nam.',
      },
      {
        id: 'vleague-2',
        vietNamName: 'GIẢI BÓNG ĐÁ HẠNG NHẤT QUỐC GIA – BIA SAO VÀNG',
        englishName: 'GOLD STAR V.LEAGUE 2',
        description: 'Giải đấu cúp bóng đá của các câu lạc bộ chuyên nghiệp.',
      },
    ],
  });

  const tournaments = await prisma.tournament.findMany();

  await prisma.season.createMany({
    data: [
      {
        name: 'GIẢI BÓNG ĐÁ VÔ ĐỊCH QUỐC GIA LPBANK 2024/25',
        tournamentId: tournaments[0].id,
        description: 'Viết tắt: Giải bóng đá VĐQG LPBANK 2024/25',
        startDate: '2024-05-01T10:00:00Z',
        endDate: '2025-04-01T10:00:00Z',
        isActive: true,
      },
      {
        name: 'GIẢI BÓNG ĐÁ HẠNG NHẤT QUỐC GIA – BIA SAO VÀNG 2024/25',
        tournamentId: tournaments[1].id,
        description: 'Viết tắt: Giải bóng đá HNQG – Bia Sao Vàng 2024/25',
        startDate: '2024-05-01T10:00:00Z',
        endDate: '2025-04-01T10:00:00Z',
        isActive: true,
      },
    ],
  });

  const seasons = await prisma.season.findMany();

  await prisma.club.createMany({ data: clubData });
  const clubs = await prisma.club.findMany();

  clubs.map(async (club, index) => {
    let players = [];

    if (club.shortName === 'DATH') players = generatePlayerDataDATH(club.id);
    else if (club.shortName === 'CAHN')
      players = generatePlayerDataCAHN(club.id);
    else if (club.shortName === 'HPFC')
      players = generatePlayerDataHPFC(club.id);
    else if (club.shortName === 'SLNA')
      players = generatePlayerDataSLNA(club.id);
    else if (club.shortName === 'HLHT')
      players = generatePlayerDataHLHT(club.id);
    else if (club.shortName === 'HAGL')
      players = generatePlayerDataHAGL(club.id);
    else if (club.shortName === 'QNFC')
      players = generatePlayerDataQNFC(club.id);
    else if (club.shortName === 'HCMFC')
      players = generatePlayerDataHCMFC(club.id);
    else if (club.shortName === 'TXND')
      players = generatePlayerDataTXND(club.id);
    else players = generatePlayerData(club.id);

    await prisma.player.createMany({ data: players });
  });

  clubs.map(async (club) => {
    await prisma.seasonClub.create({
      data: {
        seasonId: seasons[0].id,
        clubId: club.id,
      },
    });
  });

  const matches = [];
  const clubsCount = clubs.length;
  clubs.map((homeClub) => {
    clubs.map(async (awayClub) => {
      if (homeClub.id === awayClub.id) return;
      const now = fakerVI.date.recent();
      const matchDate = fakerVI.date.between({
        from: '2024-05-01',
        to: '2025-05-01',
      });
      const homeMatchStatus =
        (matchDate < now && 'COMPLETED') ||
        (matchDate === now && 'ONGOING') ||
        (matchDate > now && 'SCHEDULED');

      const matchData = {
        homeClubId: homeClub.id,
        awayClubId: awayClub.id,
        stadium: homeClub.stadium,
        homeScore: 0,
        awayScore: 0,
        status: homeMatchStatus,
        date: matchDate,
        time: fakerVI.date.soon().toISOString().slice(11, 16),
        seasonId: seasons[0].id,
        referee: fakerVI.person.fullName(),
        createdAt: fakerVI.date.past(),
        updatedAt: fakerVI.date.recent(),
      };

      matches.push(matchData);
    });
  });
  await prisma.match.createMany({ data: matches });

  const matchesData = await prisma.match.findMany({
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

  matchesData.map(async (match) => {
    if (match.status === 'COMPLETED') {
      const events = [];
      const eventsCount = fakerVI.number.int({ min: 10, max: 30 });
      for (let i = 0; i < eventsCount; i++) {
        const event = {
          matchId: match.id,
          eventTime: fakerVI.number.int({ min: 1, max: 90 }),
          clubId: i % 2 === 0 ? match.homeClubId : match.awayClubId,
          playerId: fakerVI.helpers.arrayElement(
            i % 2 === 0
              ? match.homeClub.players.map((player) => player.id)
              : match.awayClub.players.map((player) => player.id),
          ),
          eventType: fakerVI.helpers.arrayElement([
            'GOAL',
            'YELLOW_CARD',
            'RED_CARD',
            'SUBSTITUTION',
            'YELLOW_CARD',
            'RED_CARD',
            'SHOTS',
            'SHOTS_ON_TARGET',
            'BIG_CHANCES_CREATED',
            'KEY_PASSES',
            'SUCCESSFUL_DRIBBLES',
            'SAVE',
          ]),

          createdAt: fakerVI.date.past(),
          updatedAt: fakerVI.date.recent(),
        };

        event['comment'] = generateComment(event.eventType);

        const matchData = await prisma.match.findUnique({
          where: { id: match.id },
        });

        if (event.eventType === 'GOAL') {
          event['assistId'] = fakerVI.helpers.arrayElement(
            i % 2 === 0
              ? match.homeClub.players.map((player) => player.id)
              : match.awayClub.players.map((player) => player.id),
          );

          await prisma.match.update({
            where: { id: matchData.id },
            data: {
              homeScore: matchData.homeScore + (i % 2 === 0 ? 1 : 0),
              awayScore: matchData.awayScore + (i % 2 === 1 ? 0 : 1),
            },
          });
        }
        events.push(event);
      }

      await prisma.event.createMany({ data: events });
    }
  });

  await prisma.news.createMany({ data: newsData });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
