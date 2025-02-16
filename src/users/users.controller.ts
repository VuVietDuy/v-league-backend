import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Role } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('api/v1/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    // const data = await this.usersService.create(createUserDto);

    return {
      success: true,
      // data,
      message: 'Them nguoi dung thanh cong',
    };
  }

  @Get(':userId')
  getProfile(@Param('userId') userId: number) {
    return this.usersService.getProfile(+userId);
  }

  @Put(':userId')
  updateProfile(
    @Param('userId') userId: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateProfile(+userId, updateUserDto);
  }

  @Get()
  findAll(
    @Request() req: any,
    @Query('key') key: string,
    @Query('role') role: Role,
  ) {
    return this.usersService.findAll(key, role);
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
