import { Test, TestingModule } from '@nestjs/testing';
import { UserTask2Controller } from './user-task2.controller';

describe('UserTask2Controller', () => {
  let controller: UserTask2Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserTask2Controller],
    }).compile();

    controller = module.get<UserTask2Controller>(UserTask2Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
