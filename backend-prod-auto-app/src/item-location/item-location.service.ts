import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ItemLocationService {
  constructor(private readonly databaseService: DatabaseService) {}
  create(createItemLocationDto: Prisma.ItemLocationCreateInput) {
    return this.databaseService.itemLocation.create({
      data: createItemLocationDto,
    });
  }

  findAll() {
    return this.databaseService.itemLocation.findMany({});
  }

  findOne(codeArticle: string) {
    return this.databaseService.itemLocation.findUnique({
      where: { codeArticle },
    });
  }

  async update(
    codeArticle: string,
    updateItemLocationDto: Prisma.ItemLocationUpdateInput,
  ) {
    const existingItem = await this.databaseService.itemLocation.findUnique({
      where: { codeArticle },
    });
    if (!existingItem) {
      return null;
    }
    return this.databaseService.itemLocation.update({
      where: { codeArticle },
      data: updateItemLocationDto,
    });
  }

  async remove(codeArticle: string) {
    const existingItem = await this.databaseService.itemLocation.findUnique({
      where: { codeArticle },
    });
    if (!existingItem) {
      return null;
    }
    return this.databaseService.itemLocation.delete({
      where: { codeArticle },
    });
  }
}
