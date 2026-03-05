/*
 * Copyright (c) 2026, lapic-ufjf
 * Licensed under The MIT License [see LICENSE for details]
 */

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserTaskService } from './user-task.service';
import { UserTask } from './entities/user-tasks.entity';
import { UserService } from '../user/user.service';
import { TaskService } from '../task/task.service';
import { TaskQuestionMapService } from '../task-question-map/task-question-map.service';
import { UserTaskSessionService } from '../user-task-session/user-task-session.service';
import { LlmSessionService } from '../llm-session/llm-session.service';

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
});
