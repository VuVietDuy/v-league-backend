import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';

@Injectable()
export class NewsService {
  constructor(private prisma: PrismaService) {}

  create(createNewsDto: CreateNewsDto) {
    return this.prisma.news.create({ data: createNewsDto });
  }

  update(id: number, updateNewsDto: UpdateNewsDto) {
    return this.prisma.news.update({ where: { id }, data: updateNewsDto });
  }

  findAll() {
    return this.prisma.news.findMany();
  }

  findDrafts() {
    return this.prisma.news.findMany({ where: { status: 'Draft' } });
  }

  findOne(id: number) {
    return this.prisma.news.findUnique({ where: { id } });
  }

  delete(id: number) {
    return this.prisma.news.delete({
      where: { id },
    });
  }
}
