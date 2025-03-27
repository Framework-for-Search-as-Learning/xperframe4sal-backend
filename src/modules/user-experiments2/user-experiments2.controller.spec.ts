import { Test, TestingModule } from '@nestjs/testing';
import { UserExperiments2Controller } from './user-experiments2.controller';

describe('UserExperiments2Controller', () => {
  let controller: UserExperiments2Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserExperiments2Controller],
    }).compile();

    controller = module.get<UserExperiments2Controller>(UserExperiments2Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
