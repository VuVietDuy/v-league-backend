import { Module } from '@nestjs/common';
import { TablesService } from './tables.service';
import { TablesController } from './tables.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [TablesService],
  controllers: [TablesController],
  imports: [PrismaModule],
})
export class TablesModule {}
