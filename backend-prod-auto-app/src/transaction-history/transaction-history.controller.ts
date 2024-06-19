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
} from '@nestjs/common';
import { TransactionHistoryService } from './transaction-history.service';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from 'src/authentication/auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('transaction-history')
export class TransactionHistoryController {
  constructor(
    private readonly transactionHistoryService: TransactionHistoryService,
  ) {}
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
  private formatTransactionHistoryDates(transactionHistory: any): any {
    return {
      ...transactionHistory,
      orderAndTransactionDate: transactionHistory.orderAndTransactionDate
        ? this.formatDate(transactionHistory.orderAndTransactionDate)
        : null,
      recordCreationDate: transactionHistory.recordCreationDate
        ? this.formatDate(transactionHistory.recordCreationDate)
        : null,
    };
  }

  @Post()
  async create(
    @Body() createTransactionHistoryDto: Prisma.TransationHistoryCreateInput,
  ) {
    const data = {
      ...createTransactionHistoryDto,
      orderAndTransactionDate: this.formatISODate(
        createTransactionHistoryDto.orderAndTransactionDate,
      ),

      recordCreationDate: new Date().toISOString(),
    };
    return await this.transactionHistoryService.create(data);
  }

  @Get()
  async findAll() {
    const transactionsHistory = await this.transactionHistoryService.findAll();
    return transactionsHistory.map((transactionHistory) =>
      this.formatTransactionHistoryDates(transactionHistory),
    );
  }

  @Get(':LITM')
  async findOne(@Param('LITM') LITM: number) {
    const workOrder = await this.transactionHistoryService.findOne(+LITM);
    if (!workOrder) {
      throw new HttpException('transaction not found', HttpStatus.NOT_FOUND);
    }
    return this.formatTransactionHistoryDates(workOrder);
  }

  @Patch(':LITM')
  async update(
    @Param('LITM') LITM: number,
    @Body() updateTransactionHistoryDto: Prisma.TransationHistoryUpdateInput,
  ) {
    const data = {
      ...updateTransactionHistoryDto,
      orderAndTransactionDate:
        updateTransactionHistoryDto.orderAndTransactionDate !== undefined
          ? typeof updateTransactionHistoryDto.orderAndTransactionDate ===
              'string' ||
            updateTransactionHistoryDto.orderAndTransactionDate instanceof Date
            ? this.formatISODate(
                updateTransactionHistoryDto.orderAndTransactionDate,
              )
            : updateTransactionHistoryDto.orderAndTransactionDate
          : undefined,
      recordCreationDate:
        updateTransactionHistoryDto.recordCreationDate !== undefined
          ? typeof updateTransactionHistoryDto.recordCreationDate ===
              'string' ||
            updateTransactionHistoryDto.recordCreationDate instanceof Date
            ? this.formatISODate(updateTransactionHistoryDto.recordCreationDate)
            : updateTransactionHistoryDto.recordCreationDate
          : undefined,
    };
    const updateTransactionHistory =
      await this.transactionHistoryService.update(+LITM, data);
    if (!updateTransactionHistory) {
      throw new HttpException('Transaction not found', HttpStatus.NOT_FOUND);
    }
    return updateTransactionHistory;
  }

  @Delete(':LITM')
  async remove(@Param('LITM') LITM: number) {
    const result = await this.transactionHistoryService.remove(+LITM);
    if (!result) {
      throw new HttpException('Transaction not found', HttpStatus.NOT_FOUND);
    }
    return result;
  }
}
