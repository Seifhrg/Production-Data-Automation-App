import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class WorkOrderPartsListService {
  constructor(private readonly databaseService: DatabaseService) {}
  create(createWorkOrderPartsListDto: Prisma.WorkOrderPartsListCreateInput) {
    return this.databaseService.workOrderPartsList.create({
      data: createWorkOrderPartsListDto,
    });
  }

  findAll() {
    return this.databaseService.workOrderPartsList.findMany({});
  }

  findOne(UKID: number) {
    return this.databaseService.workOrderPartsList.findUnique({
      where: {
        UKID,
      },
    });
  }
  async update(
    UKID: number,
    updateWorkOrderPartsListDto: Prisma.WorkOrderPartsListUpdateInput,
  ) {
    const exist = await this.databaseService.workOrderPartsList.findUnique({
      where: {
        UKID,
      },
    });
    if (!exist) {
      return null;
    }
    return this.databaseService.workOrderPartsList.update({
      where: {
        UKID,
      },
      data: updateWorkOrderPartsListDto,
    });
  }

  async remove(UKID: number) {
    const exists = await this.databaseService.workOrderPartsList.findUnique({
      where: {
        UKID,
      },
    });
    if (!exists) {
      return null;
    }
    return this.databaseService.workOrderPartsList.delete({
      where: {
        UKID,
      },
    });
  }
}
