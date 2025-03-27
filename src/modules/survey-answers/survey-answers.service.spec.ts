import { Test, TestingModule } from '@nestjs/testing';
import { UserSurveysService } from './survey-answers.service';

describe('UserSurveysService', () => {
  let service: UserSurveysService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserSurveysService],
    }).compile();

    service = module.get<UserSurveysService>(UserSurveysService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
