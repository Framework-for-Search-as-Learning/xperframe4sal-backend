/*
 * Copyright (c) 2026, lapic-ufjf
 * Licensed under The MIT License [see LICENSE for details]
 */

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SurveyService } from './survey.service';
import { Survey } from './entity/survey.entity';
import { ExperimentService } from '../experiment/experiment.service';
import { SurveyAnswerService } from '../survey-answer/survey-answer.service';

describe('SurveyService', () => {
  let service: SurveyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SurveyService,
        {
          provide: getRepositoryToken(Survey),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: ExperimentService,
          useValue: {
            find: jest.fn(),
          },
        },
        {
          provide: SurveyAnswerService,
          useValue: {
            getStats: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<SurveyService>(SurveyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
