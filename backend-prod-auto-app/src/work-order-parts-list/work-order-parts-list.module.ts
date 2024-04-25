import { Module } from '@nestjs/common';
import { WorkOrderPartsListService } from './work-order-parts-list.service';
import { WorkOrderPartsListController } from './work-order-parts-list.controller';

@Module({
  controllers: [WorkOrderPartsListController],
  providers: [WorkOrderPartsListService],
})
export class WorkOrderPartsListModule {}
