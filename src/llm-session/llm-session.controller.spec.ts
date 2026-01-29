import { Test, TestingModule } from '@nestjs/testing';
import { LlmSessionController } from './llm-session.controller';

describe('LlmSessionController', () => {
  let controller: LlmSessionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LlmSessionController],
    }).compile();

    controller = module.get<LlmSessionController>(LlmSessionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
