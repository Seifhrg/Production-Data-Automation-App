import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { LoggingService } from './log.service';
import { HttpLoggingMiddleware } from './log.middleware';
import { TransactionLoggingInterceptor } from './log.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DatabaseModule } from '../database/database.module';
import { LogController } from './log.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [LogController],
  providers: [
    LoggingService,
    {
      provide: APP_INTERCEPTOR,
      useClass: TransactionLoggingInterceptor,
    },
  ],
  exports: [LoggingService],
})
export class LogModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(HttpLoggingMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
