import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ItemLocationService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createItemLocationDto: Prisma.ItemLocationCreateInput) {
    const { quantityOnHand, quantityReserved } = createItemLocationDto;

    // Ensure quantityOnHand and quantityReserved are numbers
    if (
      typeof quantityOnHand !== 'number' ||
      typeof quantityReserved !== 'number'
    ) {
      throw new Error('quantityOnHand and quantityReserved must be numbers');
    }

    const quantityAvailable = quantityOnHand - quantityReserved;

    return this.databaseService.itemLocation.create({
      data: {
        ...createItemLocationDto,
        quantityAvailable,
      },
    });
  }

  findAll() {
    return this.databaseService.itemLocation.findMany({});
  }

  findOne(codeArticle: number) {
    console.log(typeof codeArticle);
    return this.databaseService.itemLocation.findUnique({
      where: { codeArticle },
    });
  }

  async update(
    codeArticle: number,
    updateItemLocationDto: Prisma.ItemLocationUpdateInput,
  ) {
    const existingItem = await this.databaseService.itemLocation.findUnique({
      where: { codeArticle },
    });

    if (!existingItem) {
      return null;
    }

    // Use existing values if new ones are not provided
    const quantityOnHand =
      updateItemLocationDto.quantityOnHand ?? existingItem.quantityOnHand;
    const quantityReserved =
      updateItemLocationDto.quantityReserved ?? existingItem.quantityReserved;

    // Ensure quantityOnHand and quantityReserved are numbers
    if (
      typeof quantityOnHand !== 'number' ||
      typeof quantityReserved !== 'number'
    ) {
      throw new Error('quantityOnHand and quantityReserved must be numbers');
    }

    const quantityAvailable = quantityOnHand - quantityReserved;

    return this.databaseService.itemLocation.update({
      where: { codeArticle },
      data: {
        ...updateItemLocationDto,
        quantityAvailable,
      },
    });
  }

  async remove(codeArticle: number) {
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
