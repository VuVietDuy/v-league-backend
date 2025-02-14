import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TournamentsService } from './tournaments.service';
import { ApiBody, ApiQuery } from '@nestjs/swagger';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';

@Controller('api/v1/tournaments')
export class TournamentsController {
  constructor(private tournamentsService: TournamentsService) {}

  @Post()
  @ApiBody({ type: CreateTournamentDto })
  create(@Body() createTournamentDto: CreateTournamentDto) {
    return this.tournamentsService.create(createTournamentDto);
  }

  @Get()
  findAll() {
    return this.tournamentsService.findAll();
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTournamentDto: UpdateTournamentDto,
  ) {
    return this.tournamentsService.update(id, updateTournamentDto);
  }

  @Get(':tournamentId/matches')
  getMatches(@Param('tournamentId') tournamentId: string) {
    return this.tournamentsService.getMatches(tournamentId);
  }

  @Get(':tournamentId/fixtures')
  @ApiQuery({
    name: 'clubId',
    required: false,
    type: Number,
    description: 'Lọc theo id câu lạc bộ, ',
  })
  @ApiQuery({
    name: 'status',
    required: false,
    type: String,
    description: 'Lọc theo status ',
  })
  @ApiQuery({
    name: 'seasonId',
    required: false,
    type: Number,
    description: 'Lọc theo season, không truyền sẽ trả về màu giải hiện tại',
  })
  getFixture(
    @Param('tournamentId') tournamentId: string,
    @Query('clubId') clubId: number,
    @Query('status') status: string,
    @Query('seasonId') seasonId: number,
  ) {
    const orClause = [];
    const andClause = [];
    if (clubId) {
      orClause.push({ homeClubId: +clubId }, { awayClubId: +clubId });
    }
    if (status) {
      andClause.push({ status: status });
    }
    let where = [
      {
        AND: [...andClause, { OR: orClause }],
      },
    ];

    return this.tournamentsService.getMatches(tournamentId, where, +seasonId);
  }

  @Get(':tournamentId/seasons')
  getSeasons(@Param('tournamentId') tournamentId: string) {
    return this.tournamentsService.getSeasons(tournamentId);
  }

  @Get(':tournamentId/results')
  getResults(@Param('tournamentId') tournamentId: string) {
    return this.tournamentsService.getResults(tournamentId, {
      status: 'COMPLETED',
    });
  }

  @Get(':tournamentId/tables')
  getTables(@Param('tournamentId') tournamentId: string) {
    return this.tournamentsService.getTables(tournamentId);
  }

  @Get(':tournamentId/clubs')
  async getClubs(@Param('tournamentId') tournamentId: string) {
    return this.tournamentsService.getClubs(tournamentId);
  }

  @Get(':tournamentId/dashboard')
  async getDashboard(@Param('tournamentId') tournamentId: string) {
    return this.tournamentsService.getDashboard(tournamentId);
  }
}
