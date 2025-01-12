import { ApiProperty } from '@nestjs/swagger';

export class CreateTournamentDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  vietNamName: string;

  @ApiProperty()
  englishName: string;

  @ApiProperty()
  description?: string;
}
