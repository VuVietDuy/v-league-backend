import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { SeasonsService } from './seasons.service';
import { CreateSeasonDto } from './dto/create-season.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('api/v1/seasons')
export class SeasonsController {
  constructor(
    private seasonsService: SeasonsService,
    private cloudinaryService: CloudinaryService,
  ) {}

  @Get()
  async findAll() {
    const data = await this.seasonsService.findAll();

    return {
      success: true,
      data: data,
      message: 'Danh sách mùa giải',
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'Tên mùa giải',
          default: 'GIẢI BÓNG ĐÁ VÔ ĐỊCH QUỐC GIA LPBANK 2024/25',
        },
        logo: {
          type: 'string',
          format: 'binary',
          description: 'Logo mùa giải',
        },
        description: {
          type: 'string',
          description: 'Mô tả mùa giải',
          default: 'GIẢI BÓNG ĐÁ VÔ ĐỊCH QUỐC GIA LPBANK 2024/25',
        },
        startDate: {
          type: 'string',
          description: 'Ngày bắt đầu',
          default: '2025-01-11T10:00:00Z',
          format: 'date-time',
        },
        endDate: {
          type: 'string',
          description: 'Ngày kết thúc',
          default: '2025-01-12T18:00:00Z',
          format: 'date-time',
        },
        tournamentId: {
          type: 'string',
          description: 'Id giải đấu',
          default: 'vleague-1',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('logo'))
  async create(
    @Body() createSeasonDto: CreateSeasonDto,
    @UploadedFile() logo: Express.Multer.File,
  ) {
    const fileUploaded = await this.cloudinaryService.uploadFile(logo);

    createSeasonDto.logoURL = fileUploaded.url;

    if (createSeasonDto.isActive && createSeasonDto.tournamentId) {
      await this.seasonsService.unActiveSeasons(createSeasonDto.tournamentId);
      createSeasonDto.isActive = createSeasonDto.isActive + '' === 'true';
    }

    const data = await this.seasonsService.create(createSeasonDto);

    return {
      success: true,
      data: data,
      message: 'Thêm mùa giải thành công',
    };
  }

  @Post('/clubs')
  async addClubs(@Body() data: { tournamentId: string; clubs: number[] }) {
    const currentSeason = await this.seasonsService.findOne({
      tournamentId: data.tournamentId,
      isActive: true,
    });
    const res = this.seasonsService.addSeasonClubs(
      currentSeason.id,
      data.clubs,
    );
    return res;
  }

  @Get(':tournamentId/clubs')
  async getSeasonClubs(@Param('tournamentId') tournamentId: string) {
    const currentSeason = await this.seasonsService.findOne({
      tournamentId: tournamentId,
      isActive: true,
    });

    const clubs = await this.seasonsService.getSeasonClubs(currentSeason.id);
    if (currentSeason)
      return {
        success: true,
        data: clubs,
      };

    return {
      success: true,
      data: [],
    };
  }
}
