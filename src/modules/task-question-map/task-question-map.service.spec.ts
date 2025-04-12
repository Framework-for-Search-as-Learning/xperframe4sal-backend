import { Test, TestingModule } from '@nestjs/testing';
import { TaskQuestionMapService } from './task-question-map.service';

describe('TaskQuestionMapService', () => {
  let service: TaskQuestionMapService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskQuestionMapService],
    }).compile();

    service = module.get<TaskQuestionMapService>(TaskQuestionMapService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
