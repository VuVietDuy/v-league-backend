export class CreateNewsDto {
  title: string;
  content: string;
  thumbnail: string;
  thumbnailFile: File;
  status: string;
  publishedAt: Date;
  tag: string;
}
