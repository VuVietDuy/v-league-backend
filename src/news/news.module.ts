import { Module } from '@nestjs/common';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  controllers: [NewsController],
  providers: [NewsService],
  imports: [PrismaModule, CloudinaryModule],
  exports: [NewsService],
})
export class NewsModule {}
