import { ApiProperty } from '@nestjs/swagger';

export class CreateTournamentDto {
  @ApiProperty()
  vietNamName: string;

  @ApiProperty()
  englishName: string;

  @ApiProperty()
  description?: string;
}
