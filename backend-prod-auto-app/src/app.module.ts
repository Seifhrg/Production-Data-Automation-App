import { Module } from '@nestjs/common';

import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './authentication/auth.module';
import { WorkOrdersModule } from './work-orders/work-orders.module';
import { WorkOrderRoutingModule } from './work-order-routing/work-order-routing.module';
import { WorkOrderPartsListModule } from './work-order-parts-list/work-order-parts-list.module';

import { TransactionHistoryModule } from './transaction-history/transaction-history.module';
import { ItemLocationModule } from './item-location/item-location.module';
import { HeaderWoModule } from './header-wo/header-wo.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    AuthModule,
    WorkOrdersModule,
    WorkOrderRoutingModule,
    WorkOrderPartsListModule,
    TransactionHistoryModule,
    ItemLocationModule,
    HeaderWoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
