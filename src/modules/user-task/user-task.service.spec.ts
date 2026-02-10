import { Test, TestingModule } from '@nestjs/testing';
import { UserTaskService } from './user-task.service';

describe('UserTaskService', () => {
  let service: UserTaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserTaskService],
    }).compile();

    service = module.get<UserTaskService>(UserTaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
