/*
 * Copyright (c) 2026, lapic-ufjf
 * Licensed under The MIT License [see LICENSE for details]
 */

import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { SurveyService } from '../survey/survey.service';
import { UserService } from '../user/user.service';
import { UserTaskService } from '../user-task/user-task.service';
import { SurveyAnswer } from './entity/survey-answer.entity';
import { SurveyAnswerService } from './survey-answer.service';

describe('SurveyAnswerService', () => {
  let service: SurveyAnswerService;
  let surveyAnswerRepository: { find: jest.Mock; save: jest.Mock };
  let userService: { findOne: jest.Mock };
  let surveyService: { findOneWithExperiment: jest.Mock };
  let userTaskService: { createBySurveyRule: jest.Mock; createBalanced: jest.Mock };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SurveyAnswerService,
        {
          provide: getRepositoryToken(SurveyAnswer),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: UserService,
          useValue: { findOne: jest.fn() },
        },
        {
          provide: SurveyService,
          useValue: { find: jest.fn(), findOneWithExperiment: jest.fn() },
        },
        {
          provide: UserTaskService,
          useValue: {
            findOne: jest.fn(),
            createBySurveyRule: jest.fn(),
            createBalanced: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<SurveyAnswerService>(SurveyAnswerService);
    surveyAnswerRepository = module.get(getRepositoryToken(SurveyAnswer));
    userService = module.get(UserService);
    surveyService = module.get(SurveyService);
    userTaskService = module.get(UserTaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('triggers balanced group assignment when betweenExperimentType is balanced', async () => {
      const userId = 'user-1';
      const surveyId = 'survey-1';
      const experiment = {
        _id: 'exp-1',
        betweenExperimentType: 'balanced',
        tasks: [{ _id: 'task-a' }, { _id: 'task-b' }],
      };
      const savedAnswer = {
        _id: 'answer-1',
        user_id: userId,
        survey_id: surveyId,
        score: 4,
      };
      const allAnswers = [savedAnswer];

      userService.findOne.mockResolvedValue({ _id: userId });
      surveyService.findOneWithExperiment.mockResolvedValue({
        _id: surveyId,
        experiment,
      });
      surveyAnswerRepository.save.mockResolvedValue(savedAnswer);
      surveyAnswerRepository.find.mockResolvedValue(allAnswers);

      await service.create({ userId, surveyId, answers: [] });

      expect(userTaskService.createBalanced).toHaveBeenCalledWith({
        userId,
        experimentId: experiment._id,
        tasks: experiment.tasks,
        surveyAnswer: savedAnswer,
        allSurveyAnswers: allAnswers,
      });
      expect(userTaskService.createBySurveyRule).not.toHaveBeenCalled();
    });

    it('does not trigger balanced assignment for other betweenExperimentType values', async () => {
      const userId = 'user-1';
      const surveyId = 'survey-1';
      const experiment = { _id: 'exp-1', betweenExperimentType: 'random' };
      const savedAnswer = {
        _id: 'answer-1',
        user_id: userId,
        survey_id: surveyId,
        score: 4,
      };

      userService.findOne.mockResolvedValue({ _id: userId });
      surveyService.findOneWithExperiment.mockResolvedValue({
        _id: surveyId,
        experiment,
      });
      surveyAnswerRepository.save.mockResolvedValue(savedAnswer);

      await service.create({ userId, surveyId, answers: [] });

      expect(userTaskService.createBalanced).not.toHaveBeenCalled();
    });
  });
});
