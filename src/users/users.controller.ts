import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { GuardsConsumer } from '@nestjs/core/guards';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('api/v1/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const data = await this.usersService.create(createUserDto);

    return {
      success: true,
      data,
      message: 'Them nguoi dung thanh cong',
    };
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAll(@Request() req: any) {
    console.log(req);
    const data = await this.usersService.findAll();

    return {
      success: true,
      data,
      message: 'Danh sach nguoi dung',
    };
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    const data = await this.usersService.delete(id);
    console.log(req);
    return {
      success: true,
      data,
      message: 'Xoa nguoi dung thanh cong',
    };
  }
}
