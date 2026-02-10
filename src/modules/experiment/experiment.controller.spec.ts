import { Test, TestingModule } from '@nestjs/testing';
import { ExperimentController } from './experiment.controller';

describe('ExperimentController', () => {
  let controller: ExperimentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExperimentController],
    }).compile();

    controller = module.get<ExperimentController>(ExperimentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
