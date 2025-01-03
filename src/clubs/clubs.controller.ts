import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ClubsService } from './clubs.service';
import { ApiBody, ApiConsumes, ApiResponse } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';

@Controller('api/v1/clubs')
export class ClubsController {
  constructor(
    private clubsService: ClubsService,
    private cloudinary: CloudinaryService,
  ) {}

  @Get()
  findAll() {
    return this.clubsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const data = await this.clubsService.findOne(id);
    return {
      success: true,
      data: data,
      message: `Thông tin chi tiết câu lạc bộ ${data.name}`,
    };
  }

  @Get(':clubId/players')
  async findPlayerByClubId(@Param('clubId', ParseIntPipe) clubId: number) {
    const data = await this.clubsService.findOne(clubId);
    return {
      success: true,
      data: data,
      message: `Danh sách cầu thủ câu lạc bộ ${data.name}`,
    };
  }

  @Patch(':id')
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

  @Post()
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
    const fileUploaded = await this.cloudinary.uploadFile(logo);

    createClubDto.foundedYear = parseInt(createClubDto.foundedYear as any, 10);
    createClubDto.logoURL = fileUploaded.url;

    const data = await this.clubsService.create(createClubDto);

    return {
      success: false,
      data: data,
      message: 'Thêm câu lạc bộ thành công',
    };
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const data = await this.delete(id);
    return {
      success: true,
      data: data,
      message: 'Xóa câu lạc bộ thành công',
    };
  }
}
