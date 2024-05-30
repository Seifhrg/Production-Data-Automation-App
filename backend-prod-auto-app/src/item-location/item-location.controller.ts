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
import { ItemLocationService } from './item-location.service';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from 'src/authentication/auth.guard';
import { TransactionLoggingInterceptor } from 'src/log/log.interceptor';
@UseInterceptors(TransactionLoggingInterceptor)
@UseGuards(JwtAuthGuard)
@Controller('item-location')
export class ItemLocationController {
  constructor(private readonly itemLocationService: ItemLocationService) {}

  @Post()
  create(@Body() createItemLocationDto: Prisma.ItemLocationCreateInput) {
    return this.itemLocationService.create(createItemLocationDto);
  }

  @Get()
  findAll() {
    return this.itemLocationService.findAll();
  }

  @Get(':codeArticle')
  async findOne(@Param('codeArticle') codeArticle: string) {
    const result = await this.itemLocationService.findOne(codeArticle);
    if (!result) {
      throw new HttpException('Item Not Found', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  @Patch(':codeArticle')
  async update(
    @Param('codeArticle') codeArticle: string,
    @Body() updateItemLocationDto: Prisma.ItemLocationUpdateInput,
  ) {
    const result = await this.itemLocationService.update(
      codeArticle,
      updateItemLocationDto,
    );
    if (!result) {
      throw new HttpException('Item Not Found', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  @Delete(':codeArticle')
  async remove(@Param('codeArticle') codeArticle: string) {
    const result = await this.itemLocationService.remove(codeArticle);
    if (!result) {
      throw new HttpException('Item not found', HttpStatus.NOT_FOUND);
    }
    return result;
  }
}
