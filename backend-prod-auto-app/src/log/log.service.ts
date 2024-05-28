import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class LoggingService {
  constructor(private readonly databaseService: DatabaseService) {}

  async createLog(
    action: string,
    entity: string,
    entityId: number | null,
    userId: number | null,
    method?: string,
    url?: string,
    statusCode?: number,
  ) {
    await this.databaseService.log.create({
      data: {
        action,
        entity,
        entityId,
        userId,
        timestamp: new Date(),
        method,
        url,
        statusCode,
      },
    });
  }

  async findAllLogs() {
    return this.databaseService.log.findMany({
      orderBy: {
        timestamp: 'desc',
      },
    });
  }
}
