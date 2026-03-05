/*
 * Copyright (c) 2026, lapic-ufjf
 * Licensed under The MIT License [see LICENSE for details]
 */

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserExperimentService } from './user-experiment.service';
import { UserExperiment } from './entities/user-experiments.entity';
import { UserService } from '../user/user.service';
import { ExperimentService } from '../experiment/experiment.service';
import { UserTaskService } from '../user-task/user-task.service';
import { TaskService } from '../task/task.service';

describe('UserExperimentService', () => {
  let service: UserExperimentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserExperimentService,
        {
          provide: getRepositoryToken(UserExperiment),
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
          provide: ExperimentService,
          useValue: { find: jest.fn() },
        },
        {
          provide: UserTaskService,
          useValue: { findOne: jest.fn() },
        },
        {
          provide: TaskService,
          useValue: { find: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<UserExperimentService>(UserExperimentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
