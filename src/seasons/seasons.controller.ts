import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { SeasonsService } from './seasons.service';
import { CreateSeasonDto } from './dto/create-season.dto';

@Controller('api/v1/seasons')
export class SeasonsController {
  constructor(private seasonsService: SeasonsService) {}

  @Get()
  async findAll() {
    const data = await this.seasonsService.findAll();

    return {
      success: true,
      data: data,
      message: 'Danh sách mùa giải',
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {}

  @Post()
  async create(@Body() createSeasonDto: CreateSeasonDto) {
    this.seasonsService.create(createSeasonDto);
  }
}
