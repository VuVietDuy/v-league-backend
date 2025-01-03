import { ApiProperty } from '@nestjs/swagger';

export class CreateClubDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  stadium: string;

  @ApiProperty()
  coach: string;

  @ApiProperty()
  logoURL: string;

  @ApiProperty()
  foundedYear: number;
}
