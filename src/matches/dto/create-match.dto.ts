export class CreateMatchDto {
  homeClubId: number;
  awayClubId: number;
  stadium: string;
  status?: string;
  date: string;
  time: string;
  seasonId: number;
  tournamentId?: string;
}
