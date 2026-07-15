/*
 * Copyright (c) 2026, lapic-ufjf
 * Licensed under The MIT License [see LICENSE for details]
 */

import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { LlmSessionService } from '../llm-session/llm-session.service';
import type { SurveyAnswer } from '../survey-answer/entity/survey-answer.entity';
import type { Task } from '../task/entities/task.entity';
import { TaskService } from '../task/task.service';
import { TaskQuestionMapService } from '../task-question-map/task-question-map.service';
import type { User } from '../user/entity/user.entity';
import { UserService } from '../user/user.service';
import { UserTaskSessionService } from '../user-task-session/user-task-session.service';
import { UserTask } from './entities/user-tasks.entity';
import { UserTaskService } from './user-task.service';

describe('UserTaskService', () => {
  let service: UserTaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserTaskService,
        {
          provide: getRepositoryToken(UserTask),
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
          provide: TaskService,
          useValue: { find: jest.fn() },
        },
        {
          provide: TaskQuestionMapService,
          useValue: { findQuestionsByTask: jest.fn() },
        },
        {
          provide: UserTaskSessionService,
          useValue: { create: jest.fn() },
        },
        {
          provide: LlmSessionService,
          useValue: { startSession: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<UserTaskService>(UserTaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createBalanced', () => {
    const experimentId = 'exp-1';
    const userId = 'user-new';
    const tasks = [{ _id: 'task-a' }, { _id: 'task-b' }] as Task[];

    it('assigns to the group whose resulting average keeps the groups closest together', async () => {
      jest
        .spyOn(service, 'findTasksByUserIdAndExperimentId')
        .mockResolvedValue([]);
      jest
        .spyOn(service, 'findUsersByTaskId')
        .mockImplementation(async (taskId: string) =>
          (taskId === 'task-a'
            ? [{ _id: 'u1' }, { _id: 'u2' }]
            : [{ _id: 'u3' }]) as User[],
        );
      const createSpy = jest
        .spyOn(service, 'create')
        .mockResolvedValue({} as UserTask);

      // task-a avg=10 (u1=10, u2=10); task-b avg=2 (u3=2)
      const allSurveyAnswers = [
        { user_id: 'u1', score: 10 },
        { user_id: 'u2', score: 10 },
        { user_id: 'u3', score: 2 },
      ] as SurveyAnswer[];

      await service.createBalanced({
        userId,
        experimentId,
        tasks,
        surveyAnswer: { score: 8 } as SurveyAnswer,
        allSurveyAnswers,
      });

      // assigning score=8 to task-b -> avg 5 vs task-a avg 10 (spread 5)
      // assigning score=8 to task-a -> avg 9.33 vs task-b avg 2 (spread 7.33)
      expect(createSpy).toHaveBeenCalledWith({ userId, taskId: 'task-b' });
    });

    it('assigns to the group that most narrows the gap when one group is still empty', async () => {
      jest
        .spyOn(service, 'findTasksByUserIdAndExperimentId')
        .mockResolvedValue([]);
      jest
        .spyOn(service, 'findUsersByTaskId')
        .mockImplementation(async (taskId: string) =>
          (taskId === 'task-a' ? [{ _id: 'u1' }] : []) as User[],
        );
      const createSpy = jest
        .spyOn(service, 'create')
        .mockResolvedValue({} as UserTask);

      await service.createBalanced({
        userId,
        experimentId,
        tasks,
        surveyAnswer: { score: 5 } as SurveyAnswer,
        allSurveyAnswers: [{ user_id: 'u1', score: 10 }] as SurveyAnswer[],
      });

      // task-b (empty, avg 0) + score 5 -> avg 5 vs task-a avg 10 (spread 5)
      // task-a + score 5 -> avg 7.5 vs task-b avg 0 (spread 7.5)
      expect(createSpy).toHaveBeenCalledWith({ userId, taskId: 'task-b' });
    });

    it('does not reassign a participant who already has a task in the experiment', async () => {
      jest
        .spyOn(service, 'findTasksByUserIdAndExperimentId')
        .mockResolvedValue([{ _id: 'task-a' }] as Task[]);
      const createSpy = jest.spyOn(service, 'create');

      const result = await service.createBalanced({
        userId,
        experimentId,
        tasks,
        surveyAnswer: { score: 5 } as SurveyAnswer,
        allSurveyAnswers: [],
      });

      expect(createSpy).not.toHaveBeenCalled();
      expect(result).toBeUndefined();
    });

    it('balances using the average score of the configured question when the experiment rule is "question"', async () => {
      jest
        .spyOn(service, 'findTasksByUserIdAndExperimentId')
        .mockResolvedValue([]);
      jest
        .spyOn(service, 'findUsersByTaskId')
        .mockImplementation(async (taskId: string) =>
          (taskId === 'task-a' ? [{ _id: 'u1' }] : []) as User[],
        );
      const createSpy = jest
        .spyOn(service, 'create')
        .mockResolvedValue({} as UserTask);

      // u1 total score is 100 (would push task-a average way up), but the
      // configured question q1 only scored 10 for u1, so balancing should
      // use that narrower score instead of the survey total.
      const allSurveyAnswers = [
        {
          user_id: 'u1',
          score: 100,
          answers: [
            { id: 'q1', score: 10 },
            { id: 'q2', score: 90 },
          ],
        },
      ] as SurveyAnswer[];

      await service.createBalanced({
        userId,
        experimentId,
        tasks,
        surveyAnswer: {
          score: 100,
          answers: [
            { id: 'q1', score: 12 },
            { id: 'q2', score: 88 },
          ],
        } as SurveyAnswer,
        allSurveyAnswers,
        ruleType: 'question',
        questionIds: ['q1'],
      });

      // task-a avg(q1)=10, adding u_new(q1=12) -> avg 11 vs task-b avg 0 (spread 11)
      // task-b (empty) + u_new(q1=12) -> avg 12 vs task-a avg 10 (spread 2)
      expect(createSpy).toHaveBeenCalledWith({ userId, taskId: 'task-b' });
    });

    it('ignores survey answers from users who did not answer the configured question', async () => {
      jest
        .spyOn(service, 'findTasksByUserIdAndExperimentId')
        .mockResolvedValue([]);
      jest
        .spyOn(service, 'findUsersByTaskId')
        .mockImplementation(async (taskId: string) =>
          (taskId === 'task-a' ? [{ _id: 'u1' }] : []) as User[],
        );
      const createSpy = jest
        .spyOn(service, 'create')
        .mockResolvedValue({} as UserTask);

      const allSurveyAnswers = [
        { user_id: 'u1', score: 5, answers: [{ id: 'q2', score: 5 }] },
      ] as SurveyAnswer[];

      await service.createBalanced({
        userId,
        experimentId,
        tasks,
        surveyAnswer: {
          score: 12,
          answers: [{ id: 'q1', score: 12 }],
        } as SurveyAnswer,
        allSurveyAnswers,
        ruleType: 'question',
        questionIds: ['q1'],
      });

      // u1 has no answer for q1, so task-a is treated as an empty group (avg 0).
      expect(createSpy).toHaveBeenCalledWith({ userId, taskId: 'task-a' });
    });

    it('throws when the new participant has no answer for the configured question', async () => {
      jest
        .spyOn(service, 'findTasksByUserIdAndExperimentId')
        .mockResolvedValue([]);
      jest.spyOn(service, 'findUsersByTaskId').mockResolvedValue([]);

      await expect(
        service.createBalanced({
          userId,
          experimentId,
          tasks,
          surveyAnswer: {
            score: 12,
            answers: [{ id: 'q2', score: 12 }],
          } as SurveyAnswer,
          allSurveyAnswers: [],
          ruleType: 'question',
          questionIds: ['q1'],
        }),
      ).rejects.toThrow();
    });
  });
});
