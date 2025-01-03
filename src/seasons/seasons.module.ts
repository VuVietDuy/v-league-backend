import { Module } from '@nestjs/common';
import { SeasonsService } from './seasons.service';
import { SeasonsController } from './seasons.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [SeasonsService],
  controllers: [SeasonsController],
  imports: [PrismaModule],
})
export class SeasonsModule {}
