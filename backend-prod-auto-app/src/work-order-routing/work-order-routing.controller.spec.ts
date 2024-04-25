import { Test, TestingModule } from '@nestjs/testing';
import { WorkOrderRoutingController } from './work-order-routing.controller';
import { WorkOrderRoutingService } from './work-order-routing.service';

describe('WorkOrderRoutingController', () => {
  let controller: WorkOrderRoutingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkOrderRoutingController],
      providers: [WorkOrderRoutingService],
    }).compile();

    controller = module.get<WorkOrderRoutingController>(WorkOrderRoutingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
