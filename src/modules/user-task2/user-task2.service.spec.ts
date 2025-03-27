import { Test, TestingModule } from '@nestjs/testing';
import { UserTask2Service } from './user-task2.service';

describe('UserTask2Service', () => {
  let service: UserTask2Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserTask2Service],
    }).compile();

    service = module.get<UserTask2Service>(UserTask2Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
