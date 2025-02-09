import { MatchStatus } from '@prisma/client';

export class CreateMatchDto {
  homeClubId: number;
  homeScore: 0;
  awayClubId: number;
  awayScore: 0;
  stadium: string;
  status?: MatchStatus;
  date: string;
  time: string;
  referee: string;
  seasonId: number;
  tournamentId?: string;
}
