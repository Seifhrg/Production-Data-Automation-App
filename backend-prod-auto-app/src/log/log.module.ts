import { Module } from '@nestjs/common';
import { LoggingService } from './log.service';

import { DatabaseModule } from '../database/database.module';
import { LogController } from './log.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [LogController],
  providers: [LoggingService],
  exports: [LoggingService],
})
export class LogModule {}
