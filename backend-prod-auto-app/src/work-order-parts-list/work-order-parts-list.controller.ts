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

  @Get(':LITM/:UKID')
  async findOne(@Param('LITM') LITM: string, @Param('UKID') UKID: number) {
    const result = await this.workOrderPartsListService.findOne({ LITM, UKID });
    if (!result) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  @Patch(':LITM/:UKID')
  async update(
    @Param('LITM') LITM: string,
    @Param('UKID') UKID: number,
    @Body() updateWorkOrderPartsListDto: Prisma.WorkOrderPartsListUpdateInput,
  ) {
    const result = await this.workOrderPartsListService.update(
      { LITM, UKID },
      updateWorkOrderPartsListDto,
    );
    if (!result) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  // Adjust to use composite key
  @Delete(':LITM/:UKID')
  async remove(@Param('LITM') LITM: string, @Param('UKID') UKID: number) {
    const result = await this.workOrderPartsListService.remove({ LITM, UKID });
    if (!result) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return result;
  }
}
