import { Gender } from '@prisma/client';

export class UpdateUserDto {
  email: string;
  name: string;
  gender: Gender;
  dateOfBirth: string;
  favouriteClubId: number;
}
