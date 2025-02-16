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

  findAll(key: string) {
    let where = {};
    if (key) {
      where = {
        ...where,
        OR: [
          {
            title: {
              contains: key,
            },
          },
          {
            content: {
              contains: key,
            },
          },
        ],
      };
    }

    return this.prisma.news.findMany({
      where: where,
      orderBy: {
        publishedAt: 'desc',
      },
    });
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
