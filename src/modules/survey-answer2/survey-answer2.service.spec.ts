/*
 * Copyright (c) 2026, marcelomachado
 * Licensed under The MIT License [see LICENSE for details]
 */

import { Test, TestingModule } from '@nestjs/testing';
import { SurveyAnswer2Service } from './survey-answer2.service';

describe('SurveyAnswer2Service', () => {
  let service: SurveyAnswer2Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SurveyAnswer2Service],
    }).compile();

    service = module.get<SurveyAnswer2Service>(SurveyAnswer2Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
