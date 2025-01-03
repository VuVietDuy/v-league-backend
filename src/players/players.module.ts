import { Module } from '@nestjs/common';
import { PlayersService } from './players.service';
import { PlayersController } from './players.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  providers: [PlayersService],
  controllers: [PlayersController],
  imports: [PrismaModule, CloudinaryModule],
})
export class PlayersModule {}
