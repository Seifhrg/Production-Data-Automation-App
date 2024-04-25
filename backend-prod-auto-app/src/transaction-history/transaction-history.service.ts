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

  findOne(UKID: number) {
    return this.databaseService.transationHistory.findUnique({
      where: { UKID },
    });
  }

  async update(
    UKID: number,
    updatecTransactionHistoryDto: Prisma.TransationHistoryUpdateInput,
  ) {
    const existingTransctionHistory =
      await this.databaseService.transationHistory.findUnique({
        where: { UKID },
      });
    if (!existingTransctionHistory) {
      return null;
    }
    return this.databaseService.transationHistory.update({
      where: { UKID },
      data: updatecTransactionHistoryDto,
    });
  }

  async remove(UKID: number) {
    const existingTransactionHistory =
      await this.databaseService.transationHistory.findUnique({
        where: { UKID },
      });
    if (!existingTransactionHistory) {
      return null;
    }
    return this.databaseService.transationHistory.delete({
      where: { UKID },
    });
  }
}
