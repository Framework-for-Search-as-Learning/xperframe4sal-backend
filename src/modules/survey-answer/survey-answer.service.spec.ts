import { Test, TestingModule } from '@nestjs/testing';
import { SurveyAnswerService } from './survey-answer.service';

describe('SurveyAnswerService', () => {
  let service: SurveyAnswerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SurveyAnswerService],
    }).compile();

    service = module.get<SurveyAnswerService>(SurveyAnswerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
