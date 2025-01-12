import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { SeasonsService } from 'src/seasons/seasons.service';
import { CreateEventDto } from './dto/create-event.dto';

@Controller('api/v1/matches')
export class MatchesController {
  constructor(
    private matchsService: MatchesService,
    private seasonsService: SeasonsService,
  ) {}

  @Get()
  async findAll() {
    const data = await this.matchsService.findAll();
    return {
      success: true,
      data,
      message: '',
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const data = await this.matchsService.findOne(+id);
    return {
      success: true,
      data: data,
      message: '',
    };
  }

  @Post()
  async create(@Body() createMatchDto: CreateMatchDto) {
    const currentSeason = await this.seasonsService.findOne({
      tournamentId: createMatchDto.tournamentId,
      isActive: true,
    });

    delete createMatchDto.tournamentId;

    createMatchDto.seasonId = currentSeason.id;

    const data = await this.matchsService.create(createMatchDto);

    return {
      success: true,
      data,
      message: 'Tạo lịch thi đấu thành công',
    };
  }

  @Post(':id/events')
  async addEvent(@Body() createEventDto: CreateEventDto) {
    console.log(createEventDto);
    const data = await this.matchsService.addEvent(createEventDto);
    return {
      success: true,
      data: data,
      message: 'Thêm sự kiện thành công',
    };
  }
}
