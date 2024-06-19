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
  ParseIntPipe,
} from '@nestjs/common';
import { WorkOrderPartsListService } from './work-order-parts-list.service';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from 'src/authentication/auth.guard';
import { TransactionLoggingInterceptor } from 'src/log/log.interceptor';

@UseInterceptors(TransactionLoggingInterceptor)
@UseGuards(JwtAuthGuard)
@Controller('work-order-parts-list')
export class WorkOrderPartsListController {
  constructor(
    private readonly workOrderPartsListService: WorkOrderPartsListService,
  ) {}

  @Post()
  create(
    @Body() createWorkOrderPartsListDto: Prisma.WorkOrderPartsListCreateInput,
  ) {
    return this.workOrderPartsListService.create(createWorkOrderPartsListDto);
  }

  @Get()
  findAll() {
    return this.workOrderPartsListService.findAll();
  }

  @Get(':UKID')
  async findOne(@Param('UKID', ParseIntPipe) UKID: number) {
    const result = await this.workOrderPartsListService.findOne(UKID);
    if (!result) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  @Patch(':UKID')
  async update(
    @Param('UKID', ParseIntPipe) UKID: number,
    @Body() updateWorkOrderPartsListDto: Prisma.WorkOrderPartsListUpdateInput,
  ) {
    const result = await this.workOrderPartsListService.update(
      UKID,
      updateWorkOrderPartsListDto,
    );
    if (!result) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  @Delete(':UKID')
  async remove(@Param('UKID', ParseIntPipe) UKID: number) {
    const result = await this.workOrderPartsListService.remove(UKID);
    if (!result) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return result;
  }
}
