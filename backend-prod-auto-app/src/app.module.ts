import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { WorkOrdersModule } from './work-orders/work-orders.module';
import { WorkOrderRoutingModule } from './work-order-routing/work-order-routing.module';
import { WorkOrderPartsListModule } from './work-order-parts-list/work-order-parts-list.module';
import { TransactionHistoryModule } from './transaction-history/transaction-history.module';
import { ItemLocationModule } from './item-location/item-location.module';
import { HeaderWoModule } from './header-wo/header-wo.module';
import { LogModule } from './log/log.module';

import { AuthModule } from './authentication/auth.module';
import { ConditionalLoggingMiddleware } from './log/log.middleware';
import { EmailModule } from './mailServices/email.module';
import { PdfModule } from './pdfGenerator/pdf.module';

@Module({
  imports: [
    ConfigModule.forRoot(), //this is for  enabling the use of environment variables
    DatabaseModule,
    UsersModule,
    AuthModule,
    WorkOrdersModule,
    WorkOrderRoutingModule,
    WorkOrderPartsListModule,
    TransactionHistoryModule,
    ItemLocationModule,
    HeaderWoModule,
    LogModule,
    EmailModule,
    PdfModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  //middleware is added to skip specific routes to be added to log to optimize log size
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ConditionalLoggingMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
