import { fakerVI } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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

  const tournaments = await prisma.tournament.createMany({
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
      {
        id: 'national-cup',
        vietNamName: 'GIẢI BÓNG ĐÁ CÚP QUỐC GIA',
        englishName: 'NATIONAL CUP',
        description:
          'Trận đấu giữa nhà vô địch V-League và nhà vô địch Cúp Quốc Gia.',
      },
    ],
  });

  const seasons = await prisma.season.createMany({
    data: [
      {
        name: 'GIẢI BÓNG ĐÁ VÔ ĐỊCH QUỐC GIA LPBANK 2024/25',
        tournamentId: 'vleague-1',
        description: 'Viết tắt: Giải bóng đá VĐQG LPBANK 2024/25',
        startDate: '2024-05-01T10:00:00Z',
        endDate: '2025-04-01T10:00:00Z',
        isActive: true,
      },
      {
        name: 'GIẢI BÓNG ĐÁ HẠNG NHẤT QUỐC GIA – BIA SAO VÀNG 2024/25',
        tournamentId: 'vleague-2',
        description: 'Viết tắt: Giải bóng đá HNQG – Bia Sao Vàng 2024/25',
        startDate: '2024-05-01T10:00:00Z',
        endDate: '2025-04-01T10:00:00Z',
        isActive: true,
      },
      {
        name: 'GIẢI BÓNG ĐÁ CÚP QUỐC GIA 2024/25',
        tournamentId: 'national-cup',
        description: 'Viết tắt: Giải bóng đá Cúp QG 2024/25',
        startDate: '2024-05-01T10:00:00Z',
        endDate: '2025-04-01T10:00:00Z',
        isActive: true,
      },
    ],
  });

  const clubsData = Array.from({ length: 20 }).map(() => ({
    name: fakerVI.company.name(),
    shortName: fakerVI.company.catchPhraseAdjective(),
    stadium: fakerVI.company.catchPhrase(),
    stadiumDescription: fakerVI.lorem.sentence(),
    coach: fakerVI.name.fullName(),
    logoURL: fakerVI.image.avatar(),
    foundedYear: fakerVI.number.int({ min: 1900, max: 2023 }),
    createdAt: fakerVI.date.past(),
    updatedAt: fakerVI.date.recent(),
  }));

  const clubs = await prisma.club.createMany({ data: clubsData });

  let seasonClubs = Array.from({ length: 20 }).map((_, i) => {
    if (i < 14)
      return {
        seasonId: 1,
        clubId: i + 1,
      };
    return {
      seasonId: 2,
      clubId: i + 1,
    };
  });

  await prisma.seasonClub.createMany({ data: seasonClubs });

  const players = Array.from({ length: 200 }).map(() => ({
    name: fakerVI.name.fullName(),
    imageURL: fakerVI.image.avatarGitHub(),
    nationality: fakerVI.address.country(),
    dateOfBirth: fakerVI.date.between({ from: '1985-01-01', to: '2005-12-31' }),
    height: fakerVI.number.int({ min: 160, max: 200 }),
    weight: fakerVI.number.int({ min: 50, max: 100 }),
    position: fakerVI.helpers.arrayElement([
      'GOALKEEPER',
      'DEFENDER',
      'MIDFIELDER',
      'FORWARD',
    ]),
    clubId: fakerVI.helpers.arrayElement([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
    ]),
    shirtNumber: fakerVI.number.int({ min: 1, max: 99 }),
    createdAt: fakerVI.date.past(),
    updatedAt: fakerVI.date.recent(),
  }));

  await prisma.player.createMany({ data: players });

  const matches = [];
  for (let i = 1; i <= 14; i++) {
    for (let j = i + 1; j <= 14; j++) {
      const now = fakerVI.date.recent();
      const homeMatchDate = fakerVI.date.between({
        from: '2024-05-01',
        to: '2025-05-01',
      });
      const homeMatchStatus =
        (homeMatchDate < now && 'COMPLETED') ||
        (homeMatchDate === now && 'ONGOING') ||
        (homeMatchDate > now && 'SCHEDULED');
      const homeMatch = {
        homeClubId: i,
        awayClubId: j,
        stadium: fakerVI.company.name().split(' ')[1] + ' Stadium',
        homeScore:
          homeMatchStatus === 'COMPLETED'
            ? fakerVI.number.int({ min: 0, max: 5 })
            : 0,
        awayScore:
          homeMatchStatus === 'COMPLETED'
            ? fakerVI.number.int({ min: 0, max: 5 })
            : 0,
        status: homeMatchStatus,
        date: homeMatchDate,
        time: fakerVI.date.soon().toISOString().slice(11, 16),
        seasonId: 1,
        referee: fakerVI.person.fullName(),
        createdAt: fakerVI.date.past(),
        updatedAt: fakerVI.date.recent(),
      };
      const awayMatchDate = fakerVI.date.between({
        from: '2024-05-01',
        to: '2025-05-01',
      });
      const awayMatchStatus =
        (awayMatchDate < now && 'COMPLETED') ||
        (awayMatchDate === now && 'ONGOING') ||
        (awayMatchDate > now && 'SCHEDULED');
      const awayMatch = {
        homeClubId: j,
        awayClubId: i,
        stadium: fakerVI.company.name().split(' ')[1] + ' Stadium',
        homeScore:
          awayMatchStatus === 'COMPLETED'
            ? fakerVI.number.int({ min: 0, max: 5 })
            : 0,
        awayScore:
          awayMatchStatus === 'COMPLETED'
            ? fakerVI.number.int({ min: 0, max: 5 })
            : 0,
        status: awayMatchStatus,
        date: awayMatchDate,
        time: fakerVI.date.soon().toISOString().slice(11, 16),
        seasonId: 1,
        referee: fakerVI.person.fullName(),
        createdAt: fakerVI.date.past(),
        updatedAt: fakerVI.date.recent(),
      };
      matches.push(homeMatch);
      matches.push(awayMatch);
    }
  }

  await prisma.match.createMany({ data: matches });

  const newsData = Array.from({ length: 90 }).map(() => ({
    title: fakerVI.lorem.sentence(6),
    content: fakerVI.lorem.paragraphs(10),
    thumbnail: fakerVI.image.avatar(),
    tag: fakerVI.helpers.arrayElement([
      'Sports',
      'Technology',
      'Entertainment',
      'Politics',
      'Health',
    ]),
    status: fakerVI.helpers.arrayElement(['Draft', 'Published', 'Archived']),
    publishedAt: fakerVI.date.between({ from: '2023-01-01', to: '2024-12-31' }),
    createdAt: fakerVI.date.past(),
    updatedAt: fakerVI.date.recent(),
  }));

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
