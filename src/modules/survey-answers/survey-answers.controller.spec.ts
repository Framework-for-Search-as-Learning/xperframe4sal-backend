import { Test, TestingModule } from '@nestjs/testing';
import { UserSurveysController } from './survey-answers.controller';
import { UserSurveysService } from './survey-answers.service';

describe('UserSurveysController', () => {
  let controller: UserSurveysController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserSurveysController],
      providers: [UserSurveysService],
    }).compile();

    controller = module.get<UserSurveysController>(UserSurveysController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
