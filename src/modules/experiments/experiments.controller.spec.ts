import { Test, TestingModule } from '@nestjs/testing';
import { ExperimentsController } from './experiments.controller';
import { ExperimentsService } from './experiments.service';

describe('ExperimentsController', () => {
  let controller: ExperimentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExperimentsController],
      providers: [ExperimentsService],
    }).compile();

    controller = module.get<ExperimentsController>(ExperimentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
