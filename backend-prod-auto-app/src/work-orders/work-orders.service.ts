import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class WorkOrdersService {
  constructor(private readonly databaseService: DatabaseService) {}
  create(createWorkOrderDto: Prisma.WorkOrderCreateInput) {
    return this.databaseService.workOrder.create({ data: createWorkOrderDto });
  }

  findAll() {
    return this.databaseService.workOrder.findMany({});
  }

  findOne(DOCO: number) {
    return this.databaseService.workOrder.findUnique({ where: { DOCO } });
  }

  async update(DOCO: number, updateWorkOrderDto: Prisma.WorkOrderUpdateInput) {
    const existingWorkOrder = await this.databaseService.workOrder.findUnique({
      where: { DOCO },
    });
    if (!existingWorkOrder) {
      return null;
    }
    return this.databaseService.workOrder.update({
      where: { DOCO },
      data: updateWorkOrderDto,
    });
  }

  async remove(DOCO: number) {
    const existingWorkOrder = await this.databaseService.workOrder.findUnique({
      where: { DOCO },
    });
    if (!existingWorkOrder) {
      return null;
    }
    return this.databaseService.workOrder.delete({
      where: { DOCO },
    });
  }
}
