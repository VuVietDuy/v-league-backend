import { Module } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { MatchesController } from './matches.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SeasonsModule } from 'src/seasons/seasons.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  providers: [MatchesService],
  controllers: [MatchesController],
  imports: [PrismaModule, SeasonsModule, CloudinaryModule],
})
export class MatchesModule {}
