import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class HeaderWoService {
  constructor(private readonly databaseService: DatabaseService) {}
  create(createHeaderWoDto: Prisma.HeaderWOCreateInput) {
    return this.databaseService.headerWO.create({ data: createHeaderWoDto });
  }

  findAll() {
    return this.databaseService.headerWO.findMany({});
  }

  findOne(numOF: number) {
    return this.databaseService.headerWO.findUnique({ where: { numOF } });
  }

  async update(numOF: number, updateHeaderWoDto: Prisma.HeaderWOUpdateInput) {
    const existingWO = await this.databaseService.headerWO.findUnique({
      where: { numOF },
    });
    if (!existingWO) {
      return null;
    }
    return this.databaseService.headerWO.update({
      where: { numOF },
      data: updateHeaderWoDto,
    });
  }

  async remove(numOF: number) {
    const existingWO = await this.databaseService.headerWO.findUnique({
      where: { numOF },
    });
    if (!existingWO) {
      return null;
    }
    return this.databaseService.headerWO.delete({
      where: { numOF },
    });
  }
}
