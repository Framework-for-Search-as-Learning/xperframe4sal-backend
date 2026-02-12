/*
 * Copyright (c) 2026, lapic-ufjf
 * Licensed under The MIT License [see LICENSE for details]
 */

import { Test, TestingModule } from '@nestjs/testing';
import { SurveyAnswerController } from './survey-answer.controller';

describe('SurveyAnswerController', () => {
  let controller: SurveyAnswerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SurveyAnswerController],
    }).compile();

    controller = module.get<SurveyAnswerController>(SurveyAnswerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
