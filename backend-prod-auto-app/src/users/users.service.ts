import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createUserDto: Prisma.UsersCreateInput) {
    return this.databaseService.users.create({ data: createUserDto });
  }

  async findAll() {
    return this.databaseService.users.findMany({});
  }

  async findOne(identifier: string) {
    if (isNaN(Number(identifier))) {
      return this.databaseService.users.findUnique({
        where: { email: identifier },
      });
    } else {
      return this.databaseService.users.findUnique({
        where: { id: Number(identifier) },
      });
    }
  }

  async update(id: number, updateUserDto: Prisma.UsersUpdateInput) {
    const existingUser = await this.databaseService.users.findUnique({
      where: { id },
    });
    if (!existingUser) {
      return null;
    }
    return this.databaseService.users.update({
      data: updateUserDto,
      where: { id },
    });
  }

  async remove(id: number) {
    const existingUser = await this.databaseService.users.findUnique({
      where: { id },
    });
    if (!existingUser) {
      return null;
    }
    return this.databaseService.users.delete({
      where: { id },
    });
  }
}
