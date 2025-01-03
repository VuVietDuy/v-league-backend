import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSeasonDto } from './dto/create-season.dto';

@Injectable()
export class SeasonsService {
  constructor(private prisma: PrismaService) {}

  create(createSeasonDto: CreateSeasonDto) {
    return this.prisma.season.create({ data: createSeasonDto });
  }

  findAll() {
    return this.prisma.season.findMany();
  }

  findOne(id: number) {
    return this.prisma.season.findUnique({ where: { id } });
  }

  delete(id: number) {
    return this.prisma.season.delete({
      where: { id },
    });
  }
}
