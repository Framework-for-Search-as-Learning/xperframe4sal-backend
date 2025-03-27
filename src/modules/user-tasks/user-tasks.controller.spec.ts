import { Test, TestingModule } from '@nestjs/testing';
import { UserTasksController } from './user-tasks.controller';
import { UserTasksService } from './user-tasks.service';

describe('UserTasksController', () => {
  let controller: UserTasksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserTasksController],
      providers: [UserTasksService],
    }).compile();

    controller = module.get<UserTasksController>(UserTasksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
