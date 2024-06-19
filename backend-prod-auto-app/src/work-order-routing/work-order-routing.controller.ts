import {
  Controller,
  Get,
  Patch,
  Param,
  HttpException,
  HttpStatus,
  UseGuards,
  UseInterceptors,
  Post,
  Body,
} from '@nestjs/common';
import { WorkOrderRoutingService } from './work-order-routing.service';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from 'src/authentication/auth.guard';
import { TransactionLoggingInterceptor } from 'src/log/log.interceptor';

@UseInterceptors(TransactionLoggingInterceptor)
@UseGuards(JwtAuthGuard)
@Controller('work-order-routing')
export class WorkOrderRoutingController {
  constructor(
    private readonly workOrderRoutingService: WorkOrderRoutingService,
  ) {}

  @Get()
  findAll() {
    return this.workOrderRoutingService.findAll();
  }

  @Get(':numOF/:sequenceNumberOperations')
  async findOne(
    @Param('numOF') numOF: number,
    @Param('sequenceNumberOperations') sequenceNumberOperations: number,
  ) {
    const result = await this.workOrderRoutingService.findOne({
      numOF,
      sequenceNumberOperations,
    });
    if (!result) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  @Patch(':numOF/:sequenceNumberOperations')
  async update(
    @Param('numOF') numOF: number,
    @Param('sequenceNumberOperations') sequenceNumberOperations: number,
    @Body() updateWorkOrderRoutingDto: Prisma.WorkOrderRoutingUpdateInput,
  ) {
    const result = await this.workOrderRoutingService.update(
      {
        numOF,
        sequenceNumberOperations,
      },
      updateWorkOrderRoutingDto,
    );
    if (!result) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  @Post('copy-operations')
  async copyOperationsFromGammeStandard(
    @Body('numOF') numOF: number,
    @Body('KITL') KITL: string,
  ) {
    const result =
      await this.workOrderRoutingService.copyOperationsFromGammeStandard(
        numOF,
        KITL,
      );
    if (!result) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return result;
  }
}
