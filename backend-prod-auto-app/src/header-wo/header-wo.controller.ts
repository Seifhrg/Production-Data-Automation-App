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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { HeaderWoService } from './header-wo.service';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from 'src/authentication/auth.guard';
import { TransactionLoggingInterceptor } from 'src/log/log.interceptor';
@UseGuards(JwtAuthGuard)
@Controller('header-wo')
@UseInterceptors(TransactionLoggingInterceptor)
export class HeaderWoController {
  constructor(private readonly headerWoService: HeaderWoService) {}

  @Post()
  create(@Body() createHeaderWoDto: Prisma.HeaderWOCreateInput) {
    return this.headerWoService.create(createHeaderWoDto);
  }

  @Get()
  findAll() {
    return this.headerWoService.findAll();
  }

  @Get(':numOF')
  async findOne(@Param('numOF') numOF: number) {
    const result = await this.headerWoService.findOne(+numOF);
    if (!result) {
      throw new HttpException('WO Not Found', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  @Patch(':numOF')
  async update(
    @Param('numOF') numOF: number,
    @Body() updateHeaderWoDto: Prisma.HeaderWOUpdateInput,
  ) {
    const result = await this.headerWoService.update(+numOF, updateHeaderWoDto);
    if (!result) {
      throw new HttpException('WO Not Found', HttpStatus.NOT_FOUND);
    }
    return result;
  }
  @Delete(':numOF')
  async remove(@Param('numOF') numOF: number) {
    const result = await this.headerWoService.remove(+numOF);
    if (!result) {
      throw new HttpException('WO not found', HttpStatus.NOT_FOUND);
    }
    return result;
  }
}
