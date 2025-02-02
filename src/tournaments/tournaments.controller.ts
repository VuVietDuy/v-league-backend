import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { TournamentsService } from './tournaments.service';
import { ApiBody } from '@nestjs/swagger';
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
  getFixture(@Param('tournamentId') tournamentId: string) {
    return this.tournamentsService.getMatches(tournamentId, {
      status: 'Scheduled',
    });
  }

  @Get(':tournamentId/results')
  getResults(@Param('tournamentId') tournamentId: string) {
    return this.tournamentsService.getMatches(tournamentId, {
      status: 'Completed',
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
