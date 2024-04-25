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
import { WorkOrderRoutingService } from './work-order-routing.service';
import { Prisma } from '@prisma/client';

@Controller('work-order-routing')
export class WorkOrderRoutingController {
  constructor(
    private readonly workOrderRoutingService: WorkOrderRoutingService,
  ) {}

  @Post()
  create(
    @Body() createWorkOrderRoutingDto: Prisma.WorkOrderRoutingCreateInput,
  ) {
    return this.workOrderRoutingService.create(createWorkOrderRoutingDto);
  }

  @Get()
  findAll() {
    return this.workOrderRoutingService.findAll();
  }

  @Get(':numOF/:sequenceNumberOperations/:businessUnit/:typeOperationCode')
  async findOne(
    @Param('numOF') numOF: number,
    @Param('sequenceNumberOperations') sequenceNumberOperations: string,
    @Param('businessUnit') businessUnit: string,
    @Param('typeOperationCode') typeOperationCode: string,
  ) {
    const result = await this.workOrderRoutingService.findOne({
      numOF,
      sequenceNumberOperations,
      businessUnit,
      typeOperationCode,
    });
    if (!result) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  @Patch(':numOF/:sequenceNumberOperations/:businessUnit/:typeOperationCode')
  async update(
    @Param('numOF') numOF: number,
    @Param('sequenceNumberOperations') sequenceNumberOperations: string,
    @Param('businessUnit') businessUnit: string,
    @Param('typeOperationCode') typeOperationCode: string,
    @Body() updateWorkOrderRoutingDto: Prisma.WorkOrderRoutingUpdateInput,
  ) {
    const result = await this.workOrderRoutingService.update(
      {
        numOF,
        sequenceNumberOperations,
        businessUnit,
        typeOperationCode,
      },
      updateWorkOrderRoutingDto,
    );
    if (!result) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  @Delete(':numOF/:sequenceNumberOperations/:businessUnit/:typeOperationCode')
  async remove(
    @Param('numOF') numOF: number,
    @Param('sequenceNumberOperations') sequenceNumberOperations: string,
    @Param('businessUnit') businessUnit: string,
    @Param('typeOperationCode') typeOperationCode: string,
  ) {
    const result = await this.workOrderRoutingService.remove({
      numOF,
      sequenceNumberOperations,
      businessUnit,
      typeOperationCode,
    });
    if (!result) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return result;
  }
}
