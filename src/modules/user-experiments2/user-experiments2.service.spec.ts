import { Test, TestingModule } from '@nestjs/testing';
import { UserExperiments2Service } from './user-experiments2.service';

describe('UserExperiments2Service', () => {
  let service: UserExperiments2Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserExperiments2Service],
    }).compile();

    service = module.get<UserExperiments2Service>(UserExperiments2Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
