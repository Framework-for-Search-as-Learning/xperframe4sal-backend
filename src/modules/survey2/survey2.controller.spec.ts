import { Test, TestingModule } from '@nestjs/testing';
import { Survey2Controller } from './survey2.controller';

describe('Survey2Controller', () => {
  let controller: Survey2Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Survey2Controller],
    }).compile();

    controller = module.get<Survey2Controller>(Survey2Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
