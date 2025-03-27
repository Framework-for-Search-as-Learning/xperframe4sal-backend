import { Test, TestingModule } from '@nestjs/testing';
import { User2Service } from './user2.service';

describe('User2Service', () => {
  let service: User2Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [User2Service],
    }).compile();

    service = module.get<User2Service>(User2Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
