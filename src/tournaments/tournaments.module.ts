import { Module } from '@nestjs/common';
import { TournamentsController } from './tournaments.controller';
import { TournamentsService } from './tournaments.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [TournamentsController],
  providers: [TournamentsService],
  imports: [PrismaModule],
})
export class TournamentsModule {}
