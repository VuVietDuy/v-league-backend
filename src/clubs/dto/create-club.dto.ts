import { ApiProperty } from '@nestjs/swagger';

export class CreateClubDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  shortName?: string;

  @ApiProperty()
  stadium: string;

  @ApiProperty()
  stadiumDescription: string;

  @ApiProperty()
  coach: string;

  @ApiProperty()
  logoURL: string;

  @ApiProperty()
  foundedYear: number;

  @ApiProperty()
  stadiumCapacity: number;

  @ApiProperty()
  stadiumAddress: string;

  @ApiProperty()
  stadiumMap: string;
}
