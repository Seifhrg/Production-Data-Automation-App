import { Module } from '@nestjs/common';
import { WorkOrderRoutingService } from './work-order-routing.service';
import { WorkOrderRoutingController } from './work-order-routing.controller';

@Module({
  controllers: [WorkOrderRoutingController],
  providers: [WorkOrderRoutingService],
})
export class WorkOrderRoutingModule {}
