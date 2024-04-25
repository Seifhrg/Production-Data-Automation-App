import { Test, TestingModule } from '@nestjs/testing';
import { WorkOrderPartsListController } from './work-order-parts-list.controller';
import { WorkOrderPartsListService } from './work-order-parts-list.service';

describe('WorkOrderPartsListController', () => {
  let controller: WorkOrderPartsListController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkOrderPartsListController],
      providers: [WorkOrderPartsListService],
    }).compile();

    controller = module.get<WorkOrderPartsListController>(WorkOrderPartsListController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
