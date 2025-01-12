import { Module } from '@nestjs/common';
import { SeasonsService } from './seasons.service';
import { SeasonsController } from './seasons.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  providers: [SeasonsService],
  controllers: [SeasonsController],
  imports: [PrismaModule, CloudinaryModule],
  exports: [SeasonsService],
})
export class SeasonsModule {}
