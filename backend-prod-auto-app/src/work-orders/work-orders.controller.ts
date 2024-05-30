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
import { WorkOrdersService } from './work-orders.service';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from 'src/authentication/auth.guard';
import { TransactionLoggingInterceptor } from 'src/log/log.interceptor';
@UseInterceptors(TransactionLoggingInterceptor)
@UseGuards(JwtAuthGuard)
@Controller('work-orders')
export class WorkOrdersController {
  constructor(private readonly workOrdersService: WorkOrdersService) {}

  private formatISODate(date: Date | string): string {
    if (typeof date === 'string' || date instanceof Date) {
      return new Date(date).toISOString();
    }
    return date; /*  handle only date or string type. This approach is particularly useful when you mi
        ght encounter a scenario where Prisma's update operations are used (like { set: new Date() }),
         which should not be converted to a string directly. */
  }

  private formatDate(date: Date | string): string {
    if (typeof date === 'string' || date instanceof Date) {
      const newDate = new Date(date);
      return newDate.toISOString().split('T')[0];
    }
    return date;
  }

  private formatWorkOrderDates(workOrder: any): any {
    return {
      ...workOrder,
      startDate: workOrder.startDate
        ? this.formatDate(workOrder.startDate)
        : null,
      requestedDate: workOrder.requestedDate
        ? this.formatDate(workOrder.requestedDate)
        : null,
      workOrderDate: workOrder.workOrderDate
        ? this.formatDate(workOrder.workOrderDate)
        : null,
      statusChangeDate: workOrder.statusChangeDate
        ? this.formatDate(workOrder.statusChangeDate)
        : null,
      completionDate: workOrder.completionDate
        ? this.formatDate(workOrder.completionDate)
        : null,
      updatedDate: workOrder.updatedDate
        ? this.formatDate(workOrder.updatedDate)
        : null,
    };
  }

  @Post()
  async create(@Body() createWorkOrderDto: Prisma.WorkOrderCreateInput) {
    const data = {
      ...createWorkOrderDto,
      startDate: this.formatISODate(createWorkOrderDto.startDate),
      requestedDate: this.formatISODate(createWorkOrderDto.requestedDate),
      workOrderDate: this.formatISODate(createWorkOrderDto.workOrderDate),
      statusChangeDate: this.formatISODate(createWorkOrderDto.statusChangeDate),
      completionDate: this.formatISODate(createWorkOrderDto.completionDate),
      updatedDate: new Date().toISOString(),
    };
    return await this.workOrdersService.create(data);
  }

  @Get()
  async findAll() {
    const workOrders = await this.workOrdersService.findAll();
    return workOrders.map((workOrder) => this.formatWorkOrderDates(workOrder));
  }

  @Get(':DOCO')
  async findOne(@Param('DOCO') DOCO: string) {
    const workOrder = await this.workOrdersService.findOne(+DOCO);
    if (!workOrder) {
      throw new HttpException('Work order not found', HttpStatus.NOT_FOUND);
    }
    return this.formatWorkOrderDates(workOrder);
  }

  @Patch(':DOCO')
  async update(
    @Param('DOCO') DOCO: string,
    @Body() updateWorkOrderDto: Prisma.WorkOrderUpdateInput,
  ) {
    const data = {
      ...updateWorkOrderDto,
      startDate:
        updateWorkOrderDto.startDate !== undefined
          ? typeof updateWorkOrderDto.startDate === 'string' ||
            updateWorkOrderDto.startDate instanceof Date
            ? this.formatISODate(updateWorkOrderDto.startDate)
            : updateWorkOrderDto.startDate
          : undefined,
      requestedDate:
        updateWorkOrderDto.requestedDate !== undefined
          ? typeof updateWorkOrderDto.requestedDate === 'string' ||
            updateWorkOrderDto.requestedDate instanceof Date
            ? this.formatISODate(updateWorkOrderDto.requestedDate)
            : updateWorkOrderDto.requestedDate
          : undefined,
      workOrderDate:
        updateWorkOrderDto.workOrderDate !== undefined
          ? typeof updateWorkOrderDto.workOrderDate === 'string' ||
            updateWorkOrderDto.workOrderDate instanceof Date
            ? this.formatISODate(updateWorkOrderDto.workOrderDate)
            : updateWorkOrderDto.workOrderDate
          : undefined,
      statusChangeDate:
        updateWorkOrderDto.statusChangeDate !== undefined
          ? typeof updateWorkOrderDto.statusChangeDate === 'string' ||
            updateWorkOrderDto.statusChangeDate instanceof Date
            ? this.formatISODate(updateWorkOrderDto.statusChangeDate)
            : updateWorkOrderDto.statusChangeDate
          : undefined,
      completionDate:
        updateWorkOrderDto.completionDate !== undefined
          ? typeof updateWorkOrderDto.completionDate === 'string' ||
            updateWorkOrderDto.completionDate instanceof Date
            ? this.formatISODate(updateWorkOrderDto.completionDate)
            : updateWorkOrderDto.completionDate
          : undefined,
    };

    const updatedOrder = await this.workOrdersService.update(+DOCO, data);
    if (!updatedOrder) {
      throw new HttpException('Work order not found', HttpStatus.NOT_FOUND);
    }
    return updatedOrder;
  }

  @Delete(':DOCO')
  async remove(@Param('DOCO') DOCO: string) {
    const result = await this.workOrdersService.remove(+DOCO);
    if (!result) {
      throw new HttpException('Work order not found', HttpStatus.NOT_FOUND);
    }
    return result;
  }
}
