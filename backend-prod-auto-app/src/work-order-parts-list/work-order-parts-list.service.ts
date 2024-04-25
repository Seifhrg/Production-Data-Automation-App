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

  findOne(key: { LITM: string; UKID: number }) {
    return this.databaseService.workOrderPartsList.findUnique({
      where: {
        LITM_UKID: {
          LITM: key.LITM,
          UKID: Number(key.UKID),
        },
      },
    });
  }
  async update(
    key: { LITM: string; UKID: number },
    updateWorkOrderPartsListDto: Prisma.WorkOrderPartsListUpdateInput,
  ) {
    const exist = await this.databaseService.workOrderPartsList.findUnique({
      where: {
        LITM_UKID: {
          LITM: key.LITM,
          UKID: Number(key.UKID),
        },
      },
    });
    if (!exist) {
      return null;
    }
    return this.databaseService.workOrderPartsList.update({
      where: {
        LITM_UKID: {
          LITM: key.LITM,
          UKID: Number(key.UKID),
        },
      },
      data: updateWorkOrderPartsListDto,
    });
  }

  async remove(key: { LITM: string; UKID: number }) {
    const exists = await this.databaseService.workOrderPartsList.findUnique({
      where: {
        LITM_UKID: {
          LITM: key.LITM,
          UKID: Number(key.UKID),
        },
      },
    });
    if (!exists) {
      return null;
    }
    return this.databaseService.workOrderPartsList.delete({
      where: {
        LITM_UKID: {
          LITM: key.LITM,
          UKID: Number(key.UKID),
        },
      },
    });
  }
}
