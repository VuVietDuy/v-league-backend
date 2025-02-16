import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ClubsService } from './clubs.service';
import { ApiBody, ApiConsumes, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';

@Controller('api/v1/')
export class ClubsController {
  constructor(
    private clubsService: ClubsService,
    private cloudinaryService: CloudinaryService,
  ) {}

  @Get('clubs')
  findAll(@Query('key') key: string) {
    return this.clubsService.findAll(key);
  }

  @Get('clubs/:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const data = await this.clubsService.findOne(id);
    return {
      success: true,
      data: data,
      message: `Thông tin chi tiết câu lạc bộ ${data.name}`,
    };
  }

  @Get('clubs/:clubId/players')
  async findPlayerByClubId(@Param('clubId', ParseIntPipe) clubId: number) {
    const data = await this.clubsService.findOne(+clubId);
    return {
      success: true,
      data: data,
      message: `Danh sách cầu thủ câu lạc bộ ${data.name}`,
    };
  }

  @Get('clubs/:clubId/matches')
  async findMatchesByClubId(@Param('clubId', ParseIntPipe) clubId: number) {
    const data = await this.clubsService.findMatchesByClubId(+clubId);
    return {
      success: true,
      data: data,
      message: `Danh sách tran dau câu lạc bộ`,
    };
  }

  @Patch('clubs/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateClubDto: UpdateClubDto,
  ) {
    const data = await this.clubsService.update(id, updateClubDto);
    return {
      success: true,
      data: data,
      message: `Thông tin chi tiết câu lạc bộ ${data.name}`,
    };
  }

  @Post('clubs')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'Tên câu lạc bộ',
          default: 'Hoàng Anh Gia Lai',
        },
        foundedYear: {
          type: 'integer',
          description: 'Năm thành lập',
          default: 2002,
        },
        coach: {
          type: 'string',
          description: 'Huấn luyện viên',
          default: 'Nguyen Van A',
        },
        stadium: {
          type: 'string',
          description: 'Sân vận động',
          default: 'Mỹ Đình',
        },
        logo: {
          type: 'string',
          format: 'binary',
          description: 'Logo câu lạc bộ',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Thêm câu lạc bộ thành công',
    schema: {
      example: {
        success: true,
        data: {
          id: 1,
          name: 'Hoàng Anh Gia Lai',
          foundedYear: 2002,
          coach: 'Nguyen Van A',
          stadium: 'Mỹ Đình',
          logoURL: 'https://example.com/logo.jpg',
        },
        message: 'Thêm câu lạc bộ thành công',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Lỗi request',
    schema: {
      example: {
        success: false,
        message: 'Invalid input data',
      },
    },
  })
  @UseInterceptors(FileInterceptor('logo'))
  async create(
    @Body() createClubDto: CreateClubDto,
    @UploadedFile() logo: Express.Multer.File,
  ) {
    const fileUploaded = await this.cloudinaryService.uploadFile(logo);

    createClubDto.foundedYear = parseInt(createClubDto.foundedYear as any, 10);
    createClubDto.stadiumCapacity = parseInt(
      createClubDto.stadiumCapacity as any,
      10,
    );
    createClubDto.logoURL = fileUploaded.url;

    const data = await this.clubsService.create(createClubDto);

    return {
      success: true,
      data: data,
      message: 'Thêm câu lạc bộ thành công',
    };
  }

  @Delete('clubs/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const data = await this.clubsService.delete(id);
    return {
      success: true,
      data: data,
      message: 'Xóa câu lạc bộ thành công',
    };
  }

  @Get('tournaments/:tournamentId/clubs/:clubId/stats')
  @ApiQuery({
    name: 'seasonId',
    required: false,
    type: Number,
    description:
      'Lọc theo mùa giải, mặc định không truyền hoặc truyền là allSeason sẽ lấy được của thống kế tất cả mùa giải',
  })
  getClubStats(
    @Param('clubId', ParseIntPipe) clubId: number,
    @Param('tournamentId') tournamentId: string,
    @Query('seasonId') seasonId?: string,
  ) {
    const seasonWhere =
      !seasonId || seasonId === 'allSeason'
        ? {}
        : {
            seasonId: +seasonId,
          };
    const data = this.clubsService.getClubStats(clubId, seasonWhere);
    return data;
  }
}
