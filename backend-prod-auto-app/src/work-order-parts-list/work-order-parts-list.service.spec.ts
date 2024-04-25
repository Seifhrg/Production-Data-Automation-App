import { Test, TestingModule } from '@nestjs/testing';
import { WorkOrderPartsListService } from './work-order-parts-list.service';

describe('WorkOrderPartsListService', () => {
  let service: WorkOrderPartsListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkOrderPartsListService],
    }).compile();

    service = module.get<WorkOrderPartsListService>(WorkOrderPartsListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
