import { Test, TestingModule } from '@nestjs/testing';
import { SurveyAnswer2Controller } from './survey-answer2.controller';

describe('SurveyAnswer2Controller', () => {
  let controller: SurveyAnswer2Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SurveyAnswer2Controller],
    }).compile();

    controller = module.get<SurveyAnswer2Controller>(SurveyAnswer2Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
