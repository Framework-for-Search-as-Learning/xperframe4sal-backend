import { Test, TestingModule } from '@nestjs/testing';
import { UserTaskSessionController } from './user-task-session.controller';
import { UserTaskSessionService } from './user-task-session.service';

describe('UserTaskSessionController', () => {
  let controller: UserTaskSessionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserTaskSessionController],
      providers: [UserTaskSessionService],
    }).compile();

    controller = module.get<UserTaskSessionController>(UserTaskSessionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
