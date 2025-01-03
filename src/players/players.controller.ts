import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PlayersService } from './players.service';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { CreatePlayerDto } from './dto/create-player.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdatePlayerDto } from './dto/update-player.dto';

@Controller('api/v1/players')
export class PlayersController {
  constructor(
    private playersService: PlayersService,
    private cloudinaryService: CloudinaryService,
  ) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: CreatePlayerDto,
  })
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createPlayerDto: CreatePlayerDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    if (image) {
      const imageUploaded = await this.cloudinaryService.uploadFile(image);

      createPlayerDto.imageURL = imageUploaded.url;
    }

    createPlayerDto.height = +createPlayerDto.height;
    createPlayerDto.clubId = +createPlayerDto.clubId;

    const data = await this.playersService.create(createPlayerDto);

    return {
      success: false,
      data: data,
      message: 'Thêm cầu thủ thành công',
    };
  }

  @Get()
  async findAll() {
    const data = await this.playersService.findAll();

    return {
      success: true,
      data,
      message: 'Danh sach cau thu',
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.playersService.findOne(+id);

    return {
      success: true,
      data,
      message: 'Thong tin cau thu',
    };
  }

  @Put(':id')
  @ApiConsumes('multipart/form-data')
  update(@Param('id') id: string, @Body() updatePlayerDto: UpdatePlayerDto) {
    return this.playersService.update(+id, updatePlayerDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.playersService.delete(+id);
  }
}
