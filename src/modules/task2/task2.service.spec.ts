import { Test, TestingModule } from '@nestjs/testing';
import { Task2Service } from './task2.service';

describe('Task2Service', () => {
  let service: Task2Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Task2Service],
    }).compile();

    service = module.get<Task2Service>(Task2Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
