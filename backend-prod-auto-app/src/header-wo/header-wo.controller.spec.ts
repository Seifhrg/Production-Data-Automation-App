import { Test, TestingModule } from '@nestjs/testing';
import { HeaderWoController } from './header-wo.controller';
import { HeaderWoService } from './header-wo.service';

describe('HeaderWoController', () => {
  let controller: HeaderWoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HeaderWoController],
      providers: [HeaderWoService],
    }).compile();

    controller = module.get<HeaderWoController>(HeaderWoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
