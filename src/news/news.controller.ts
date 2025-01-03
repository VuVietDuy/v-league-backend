import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { NewsService } from './news.service';

@Controller('api/v1/news')
export class NewsController {
  constructor(private newsService: NewsService) {}

  @Post()
  async create() {}

  @Get()
  findAll() {
    return this.newsService.findAll();
  }
  @Get('drafts')
  findDrafts() {
    return this.newsService.findDrafts();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.newsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string) {
    return this.newsService.delete(+id);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.newsService.delete(+id);
  }
}
