import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { Operation } from './interfaces';

@Injectable()
export class WorkOrderRoutingService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findOne(key: { numOF: number; sequenceNumberOperations: number }) {
    return this.databaseService.workOrderRouting.findUnique({
      where: {
        numOF_sequenceNumberOperations: {
          numOF: Number(key.numOF),
          sequenceNumberOperations: key.sequenceNumberOperations,
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
      sequenceNumberOperations: number;
    },
    updateWorkOrderRoutingDto: Prisma.WorkOrderRoutingUpdateInput,
  ) {
    const exists = await this.databaseService.workOrderRouting.findUnique({
      where: {
        numOF_sequenceNumberOperations: {
          numOF: Number(key.numOF),
          sequenceNumberOperations: key.sequenceNumberOperations,
        },
      },
    });
    if (!exists) {
      return null;
    }
    return this.databaseService.workOrderRouting.update({
      data: updateWorkOrderRoutingDto,
      where: {
        numOF_sequenceNumberOperations: {
          numOF: Number(key.numOF),
          sequenceNumberOperations: key.sequenceNumberOperations,
        },
      },
    });
  }

  async copyOperationsFromGammeStandard(numOF: number, KITL: string) {
    const gammeStandard = await this.databaseService.gammeStandard.findUnique({
      where: { KITL },
    });

    if (!gammeStandard) {
      throw new Error(`No GammeStandard found with KITL: ${KITL}`);
    }

    // Parse the operations JSON field and type it as Operation[]
    const operations: Operation[] = JSON.parse(
      gammeStandard.operations as string,
    ).operations;

    const workOrderRoutings = operations.map((operation: Operation) => ({
      numOF: numOF,
      sequenceNumberOperations: operation.sequenceNumber,
      businessUnit: operation.businessUnit,
      Description: operation.description,
      runLabour: operation.runLabour,
      runMachine: operation.runMachine,
      setupLabor: operation.setupLabor,
      KITL: KITL,
    }));

    await this.databaseService.workOrderRouting.createMany({
      data: workOrderRoutings,
    });

    return workOrderRoutings;
  }
}
