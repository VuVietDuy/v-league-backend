import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { ClubsModule } from './clubs/clubs.module';
import { PlayersModule } from './players/players.module';
import { NewsModule } from './news/news.module';
import { MatchesModule } from './matches/matches.module';
import { UsersModule } from './users/users.module';
import { TournamentsModule } from './tournaments/tournaments.module';
import { SeasonsModule } from './seasons/seasons.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { TablesModule } from './tables/tables.module';

@Module({
  imports: [
    NewsModule,
    AuthModule,
    PrismaModule,
    ClubsModule,
    PlayersModule,
    MatchesModule,
    UsersModule,
    TournamentsModule,
    SeasonsModule,
    CloudinaryModule,
    TablesModule,
  ],
})
export class AppModule {}
