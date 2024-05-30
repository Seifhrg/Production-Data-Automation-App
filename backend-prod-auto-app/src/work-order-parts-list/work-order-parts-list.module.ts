import { Module } from '@nestjs/common';
import { WorkOrderPartsListService } from './work-order-parts-list.service';
import { WorkOrderPartsListController } from './work-order-parts-list.controller';
import { LogModule } from 'src/log/log.module';

@Module({
  imports: [LogModule],
  controllers: [WorkOrderPartsListController],
  providers: [WorkOrderPartsListService],
})
export class WorkOrderPartsListModule {}
