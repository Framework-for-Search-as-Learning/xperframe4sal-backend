import { Test, TestingModule } from '@nestjs/testing';
import { Experiments2Controller } from './experiments2.controller';

describe('Experiments2Controller', () => {
  let controller: Experiments2Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Experiments2Controller],
    }).compile();

    controller = module.get<Experiments2Controller>(Experiments2Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
