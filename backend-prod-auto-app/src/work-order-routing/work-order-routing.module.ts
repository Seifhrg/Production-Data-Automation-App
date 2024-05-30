import { Module } from '@nestjs/common';
import { WorkOrderRoutingService } from './work-order-routing.service';
import { WorkOrderRoutingController } from './work-order-routing.controller';
import { LogModule } from 'src/log/log.module';

@Module({
  imports: [LogModule],
  controllers: [WorkOrderRoutingController],
  providers: [WorkOrderRoutingService],
})
export class WorkOrderRoutingModule {}
