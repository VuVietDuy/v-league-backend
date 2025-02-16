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
import { MatchesService } from './matches.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { SeasonsService } from 'src/seasons/seasons.service';
import { CreateEventDto } from './dto/create-event.dto';
import { CreateLineupsDto } from './dto/create-lineups.dto';
import { EventType } from '@prisma/client';
import { CreateVoteDto } from './dto/create-vote.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { MatchImageDto } from './dto/match-image.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Controller('api/v1/')
export class MatchesController {
  constructor(
    private matchsService: MatchesService,
    private cloudinaryService: CloudinaryService,
    private seasonsService: SeasonsService,
  ) {}

  // Get list match in tournament
  @Get('tournaments/:tournamentId/matches')
  async findAll(
    @Param('tournamentId') tournamentId: string,
    @Query('seasonId') seasonId: number = 0,
  ) {
    const data = await this.matchsService.findAll(tournamentId, seasonId);
    return {
      success: true,
      data,
      message: '',
    };
  }

  @Get('matches/:matchId/lineups')
  getMatchLineups(@Param('matchId') matchId: number) {
    return this.matchsService.getMatchLineups(+matchId);
  }

  @Get('matches/:matchId/stats')
  getMatchStats(@Param('matchId') matchId: number) {
    return this.matchsService.getMatchStats(+matchId);
  }

  @Post('matches/:matchId/lineups')
  createMatchLineups(
    @Param('matchId') matchId: number,
    @Body() data: CreateLineupsDto[],
  ) {
    return this.matchsService.createMatchLineups(data);
  }

  @Get('matches/:id')
  findOne(@Param('id') id: number) {
    return this.matchsService.findOne(+id);
  }

  @Get('matches/:matchId/events')
  getMatchEvents(
    @Param('matchId') matchId: number,
    @Query('clubId') clubId: number,
    @Query('eventType') eventType: EventType,
  ) {
    return this.matchsService.getMatchEvents(+matchId, +clubId, eventType);
  }

  @Post('matches')
  async create(@Body() createMatchDto: CreateMatchDto) {
    const currentSeason = await this.seasonsService.findOne({
      tournamentId: createMatchDto.tournamentId,
      isActive: true,
    });

    createMatchDto.seasonId = currentSeason.id;
    createMatchDto.status = 'SCHEDULED';
    delete createMatchDto.tournamentId;

    const data = await this.matchsService.create(createMatchDto);

    return {
      success: true,
      data,
      message: 'Tạo lịch thi đấu thành công',
    };
  }

  @Post('matches/:id/events')
  async addEvent(@Body() createEventDto: CreateEventDto) {
    const data = await this.matchsService.addEvent(createEventDto);
    return {
      success: true,
      data: data,
      message: 'Thêm sự kiện thành công',
    };
  }

  @Delete('events/:eventId')
  deleteEvent(@Param('eventId') eventId: number) {
    return this.matchsService.deleteEvent(+eventId);
  }

  @Get('events/:eventId')
  getDetailEvent(@Param('eventId') eventId: number) {
    return this.matchsService.getDetailEvent(+eventId);
  }

  @Put('events/:eventId')
  updateEvent(
    @Param('eventId') eventId: number,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    return this.matchsService.updateEvent(+eventId, updateEventDto);
  }

  @Get('matches/:matchId/events')
  async getListEvents(@Param('matchId') matchId: number) {
    const data = await this.matchsService.getListEvents(matchId);
    return {
      success: true,
      data: data,
      message: 'Thêm sự kiện thành công',
    };
  }

  @Get('matches/:matchId/players/stats')
  getPlayersStats(@Param('matchId') matchId: number) {
    return this.matchsService.getPlayersStats(+matchId);
  }

  @Get('matches/:matchId/votes')
  getVotes(@Param('matchId') matchId: number) {
    return this.matchsService.getVotes(+matchId);
  }

  @Post('matches/:matchId/votes')
  createVote(@Body() createVoteDto: CreateVoteDto) {
    return this.matchsService.createVote(createVoteDto);
  }

  @Post('matches/:matchId/images')
  @UseInterceptors(FileInterceptor('image'))
  async addMatchImage(
    @Body() body: MatchImageDto,
    @Param('matchId') matchId: number,
    @UploadedFile()
    image: Express.Multer.File,
  ) {
    const fileUploaded = await this.cloudinaryService.uploadFile(image);
    body.imageURL = fileUploaded.url;
    if (typeof body.matchId === 'string') {
      body.matchId = parseInt(body.matchId);
    }

    return this.matchsService.addMatchImage(body);
  }

  @Get('matches/:matchId/images')
  async getMatchImages(@Param('matchId') matchId: number) {
    return this.matchsService.getMatchImages(+matchId);
  }
}
