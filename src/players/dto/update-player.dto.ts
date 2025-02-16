import { Position } from '@prisma/client';

export class UpdatePlayerDto {
  name?: string;
  image?: Express.Multer.File;
  imageURL?: string;
  nationality?: string;
  dateOfBirth?: string;
  height?: number;
  weight?: number;
  position?: Position;
  clubId?: number;
  shirtNumber?: number;
}
