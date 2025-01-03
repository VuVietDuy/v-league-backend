import { Module } from '@nestjs/common';
import { ClubsService } from './clubs.service';
import { ClubsController } from './clubs.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  providers: [ClubsService],
  controllers: [ClubsController],
  imports: [PrismaModule, CloudinaryModule],
})
export class ClubsModule {}
