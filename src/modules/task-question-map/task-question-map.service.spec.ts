/*
 * Copyright (c) 2026, lapic-ufjf
 * Licensed under The MIT License [see LICENSE for details]
 */

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TaskQuestionMapService } from './task-question-map.service';
import { TaskQuestionMap } from './entity/taskQuestionMap.entity';
import { TaskService } from '../task/task.service';

describe('TaskQuestionMapService', () => {
  let service: TaskQuestionMapService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskQuestionMapService,
        {
          provide: getRepositoryToken(TaskQuestionMap),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: TaskService,
          useValue: { find: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<TaskQuestionMapService>(TaskQuestionMapService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
