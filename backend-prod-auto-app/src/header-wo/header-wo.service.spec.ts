import { Test, TestingModule } from '@nestjs/testing';
import { HeaderWoService } from './header-wo.service';

describe('HeaderWoService', () => {
  let service: HeaderWoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HeaderWoService],
    }).compile();

    service = module.get<HeaderWoService>(HeaderWoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
