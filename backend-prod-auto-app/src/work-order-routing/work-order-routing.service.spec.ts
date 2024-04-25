import { Test, TestingModule } from '@nestjs/testing';
import { WorkOrderRoutingService } from './work-order-routing.service';

describe('WorkOrderRoutingService', () => {
  let service: WorkOrderRoutingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkOrderRoutingService],
    }).compile();

    service = module.get<WorkOrderRoutingService>(WorkOrderRoutingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
