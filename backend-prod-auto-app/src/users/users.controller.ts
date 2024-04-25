import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Prisma, Users } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { AuthUser } from 'src/authentication/auth-user.decorator';
import { JwtAuthGuard } from 'src/authentication/auth.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('userData')
  @UseGuards(JwtAuthGuard)
  async getUserData(@AuthUser() user: Users) {
    console.log('user', user);
    return user;
  }

  @Post()
  create(@Body() createUserDto: Prisma.UsersCreateInput) {
    createUserDto.password = bcrypt.hashSync(createUserDto.password, 10);
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: Prisma.UsersUpdateInput,
  ) {
    if (updateUserDto.password) {
      const password = updateUserDto.password as string;
      updateUserDto.password = bcrypt.hashSync(password, 10);
    }
    const updateUser = await this.usersService.update(+id, updateUserDto);
    if (!updateUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return updateUser;
  }
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.usersService.remove(+id);
    if (!result) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }
    return result;
  }
}
