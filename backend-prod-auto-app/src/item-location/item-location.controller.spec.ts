import { Test, TestingModule } from '@nestjs/testing';
import { ItemLocationController } from './item-location.controller';
import { ItemLocationService } from './item-location.service';

describe('ItemLocationController', () => {
  let controller: ItemLocationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemLocationController],
      providers: [ItemLocationService],
    }).compile();

    controller = module.get<ItemLocationController>(ItemLocationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
