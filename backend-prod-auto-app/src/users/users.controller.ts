import {
  Body,
  Controller,
  Delete,
  Get,
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
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: Prisma.UsersUpdateInput,
  ) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
