import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { Operation } from './interfaces';

@Injectable()
export class WorkOrderRoutingService {
  private readonly logger = new Logger(WorkOrderRoutingService.name);

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

  async findByNumOF(numOF: number) {
    return this.databaseService.workOrderRouting.findMany({
      where: {
        numOF: Number(numOF),
      },
    });
  }
  async copyOperationsFromGammeStandard(numOF: number, KITL: string) {
    this.logger.log(`Searching for GammeStandard with KITL: ${KITL}`);

    const gammeStandard = await this.databaseService.gammeStandard.findUnique({
      where: { KITL },
    });

    if (!gammeStandard) {
      this.logger.error(`No GammeStandard found with KITL: ${KITL}`);
      throw new Error(`No GammeStandard found with KITL: ${KITL}`);
    }

    this.logger.log(`GammeStandard found: ${JSON.stringify(gammeStandard)}`);

    const operations: Operation[] =
      gammeStandard.operations as unknown as Operation[];

    this.logger.log(`Parsed operations: ${JSON.stringify(operations)}`);

    const workOrderRoutings = operations.map((operation: Operation) => ({
      numOF: numOF,
      sequenceNumberOperations: operation.sequenceNumberOperations,
      businessUnit: operation.businessUnit,
      Description: operation.Description,
      runLabour: operation.runLabour,
      runMachine: operation.runMachine,
      setupLabor: operation.setupLabor,
      KITL: KITL,
    }));

    this.logger.log(
      `Work order routings to be created: ${JSON.stringify(workOrderRoutings)}`,
    );

    await this.databaseService.workOrderRouting.createMany({
      data: workOrderRoutings,
    });

    return workOrderRoutings;
  }
}
