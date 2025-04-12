import { Test, TestingModule } from '@nestjs/testing';
import { TaskQuestionMapController } from './task-question-map.controller';

describe('TaskQuestionMapController', () => {
  let controller: TaskQuestionMapController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskQuestionMapController],
    }).compile();

    controller = module.get<TaskQuestionMapController>(TaskQuestionMapController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
