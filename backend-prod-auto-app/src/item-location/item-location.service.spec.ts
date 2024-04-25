import { Test, TestingModule } from '@nestjs/testing';
import { ItemLocationService } from './item-location.service';

describe('ItemLocationService', () => {
  let service: ItemLocationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemLocationService],
    }).compile();

    service = module.get<ItemLocationService>(ItemLocationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
