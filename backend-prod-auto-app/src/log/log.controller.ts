import { Controller, Get, Post, Body } from '@nestjs/common';
import { LoggingService } from './log.service';

@Controller('logs')
export class LogController {
  constructor(private readonly loggingService: LoggingService) {}
  //Manually if needed to create a log otherwise it's automatically using the middleware and the interceptor who capture all transaction
  //and create  logs automatically and they are globally in all routes
  @Post()
  async createLog(@Body() logData: any) {
    return this.loggingService.createLog(
      logData.action,
      logData.entity,
      logData.entityId,
      logData.userId,
      logData.method,
      logData.url,
      logData.statusCode,
    );
  }

  @Get()
  async findAll() {
    return this.loggingService.findAllLogs();
  }
}
