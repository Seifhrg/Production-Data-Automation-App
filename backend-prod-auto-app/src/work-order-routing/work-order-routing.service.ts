import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class WorkOrderRoutingService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createWorkOrderRoutingDto: Prisma.WorkOrderRoutingCreateInput) {
    return this.databaseService.workOrderRouting.create({
      data: createWorkOrderRoutingDto,
    });
  }

  findOne(key: {
    numOF: number;
    sequenceNumberOperations: string;
    businessUnit: string;
    typeOperationCode: string;
  }) {
    return this.databaseService.workOrderRouting.findUnique({
      where: {
        numOF_sequenceNumberOperations_businessUnit_typeOperationCode: {
          numOF: Number(key.numOF),
          sequenceNumberOperations: key.sequenceNumberOperations,
          businessUnit: key.businessUnit,
          typeOperationCode: key.typeOperationCode,
        },
      },
    });
  }

  findAll() {
    return this.databaseService.workOrderRouting.findMany({});
  }

  async update(
    key: {
      numOF: number;
      sequenceNumberOperations: string;
      businessUnit: string;
      typeOperationCode: string;
    },
    updateWorkOrderRoutingDto: Prisma.WorkOrderRoutingUpdateInput,
  ) {
    const exists = await this.databaseService.workOrderRouting.findUnique({
      where: {
        numOF_sequenceNumberOperations_businessUnit_typeOperationCode: {
          numOF: Number(key.numOF),
          sequenceNumberOperations: key.sequenceNumberOperations,
          businessUnit: key.businessUnit,
          typeOperationCode: key.typeOperationCode,
        },
      },
    });
    if (!exists) {
      return null;
    }
    return this.databaseService.workOrderRouting.update({
      data: updateWorkOrderRoutingDto,
      where: {
        numOF_sequenceNumberOperations_businessUnit_typeOperationCode: {
          numOF: Number(key.numOF),
          sequenceNumberOperations: key.sequenceNumberOperations,
          businessUnit: key.businessUnit,
          typeOperationCode: key.typeOperationCode,
        },
      },
    });
  }

  async remove(key: {
    numOF: number;
    sequenceNumberOperations: string;
    businessUnit: string;
    typeOperationCode: string;
  }) {
    const exists = await this.databaseService.workOrderRouting.findUnique({
      where: {
        numOF_sequenceNumberOperations_businessUnit_typeOperationCode: {
          numOF: Number(key.numOF),
          sequenceNumberOperations: key.sequenceNumberOperations,
          businessUnit: key.businessUnit,
          typeOperationCode: key.typeOperationCode,
        },
      },
    });

    if (!exists) {
      return null;
    }

    return this.databaseService.workOrderRouting.delete({
      where: {
        numOF_sequenceNumberOperations_businessUnit_typeOperationCode: {
          numOF: Number(key.numOF),
          sequenceNumberOperations: key.sequenceNumberOperations,
          businessUnit: key.businessUnit,
          typeOperationCode: key.typeOperationCode,
        },
      },
    });
  }
}
