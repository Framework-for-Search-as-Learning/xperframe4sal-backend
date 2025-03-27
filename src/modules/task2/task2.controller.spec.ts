import { Test, TestingModule } from '@nestjs/testing';
import { Task2Controller } from './task2.controller';

describe('Task2Controller', () => {
  let controller: Task2Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Task2Controller],
    }).compile();

    controller = module.get<Task2Controller>(Task2Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
