import { Test, TestingModule } from '@nestjs/testing';
import { UserExperimentsController } from './user-experiments.controller';
import { UserExperimentsService } from './user-experiments.service';

describe('UserExperimentController', () => {
  let controller: UserExperimentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserExperimentsController],
      providers: [UserExperimentsService],
    }).compile();

    controller = module.get<UserExperimentsController>(UserExperimentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
