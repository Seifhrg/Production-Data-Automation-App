import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}





  @Post("userData")
  async getUserData(@Body() body: { token: string }) {

    console.log(body,"*********");
    const { token } = body;
  
    try {
      const userData = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
      console.log('*aa**',userData);
      return this.usersService.findOne(userData.email);
    } catch (err) {
      if (err instanceof jwt.TokenExpiredError) {
        console.log('Token has expired');
      } else if (err instanceof jwt.JsonWebTokenError) {
        console.log('Token is malformed or the secret is incorrect');
      } else {
        console.log('An unknown error occurred while verifying the token');
      }
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
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
