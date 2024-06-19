import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class TransactionHistoryService {
  constructor(private readonly databaseService: DatabaseService) {}
  create(createTransactionHistoryDto: Prisma.TransationHistoryCreateInput) {
    return this.databaseService.transationHistory.create({
      data: createTransactionHistoryDto,
    });
  }

  findAll() {
    return this.databaseService.transationHistory.findMany({});
  }

  findOne(LITM: number) {
    return this.databaseService.transationHistory.findUnique({
      where: { LITM },
    });
  }

  async update(
    LITM: number,
    updatecTransactionHistoryDto: Prisma.TransationHistoryUpdateInput,
  ) {
    const existingTransctionHistory =
      await this.databaseService.transationHistory.findUnique({
        where: { LITM },
      });
    if (!existingTransctionHistory) {
      return null;
    }
    return this.databaseService.transationHistory.update({
      where: { LITM },
      data: updatecTransactionHistoryDto,
    });
  }

  async remove(LITM: number) {
    const existingTransactionHistory =
      await this.databaseService.transationHistory.findUnique({
        where: { LITM },
      });
    if (!existingTransactionHistory) {
      return null;
    }
    return this.databaseService.transationHistory.delete({
      where: { LITM },
    });
  }
}
