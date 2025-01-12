import { faker } from '@faker-js/faker';
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

  const clubs = [];
  for (let i = 0; i < 20; i++) {
    const club = {
      name: faker.company.name(),
    };
  }
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
