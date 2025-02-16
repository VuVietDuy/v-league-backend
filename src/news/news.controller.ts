import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateNewsDto } from './dto/create-news.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { UpdateNewsDto } from './dto/update-news.dto';

@Controller('api/v1/news')
export class NewsController {
  constructor(
    private newsService: NewsService,
    private cloudinaryService: CloudinaryService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('thumbnailFile'))
  async create(
    @Body() createNewsDto: CreateNewsDto,
    @UploadedFile() thumbnailFile: Express.Multer.File,
  ) {
    const thumbnail = await this.cloudinaryService.uploadFile(thumbnailFile);

    createNewsDto.thumbnail = thumbnail.url;
    createNewsDto.publishedAt = new Date(createNewsDto.publishedAt);
    delete createNewsDto.thumbnailFile;

    const data = await this.newsService.create(createNewsDto);

    return data;
  }

  @Get()
  findAll(@Query('key') key: string) {
    return this.newsService.findAll(key);
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
  update(@Param('id') id: string, @Body() updateNewsDto: UpdateNewsDto) {
    return this.newsService.update(+id, updateNewsDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.newsService.delete(+id);
  }
}
