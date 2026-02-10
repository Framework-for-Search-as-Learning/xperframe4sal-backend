import { Test, TestingModule } from '@nestjs/testing';
import { UserTaskSessionService } from './user-task-session.service';

describe('UserTaskSessionService', () => {
  let service: UserTaskSessionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserTaskSessionService],
    }).compile();

    service = module.get<UserTaskSessionService>(UserTaskSessionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
