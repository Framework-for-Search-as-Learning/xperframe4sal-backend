/*
 * Copyright (c) 2026, lapic-ufjf
 * Licensed under The MIT License [see LICENSE for details]
 */

import { Test, TestingModule } from '@nestjs/testing';
import { TaskQuestionMapController } from './task-question-map.controller';
import { TaskQuestionMapService } from './task-question-map.service';

describe('TaskQuestionMapController', () => {
  let controller: TaskQuestionMapController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskQuestionMapController],
      providers: [
        {
          provide: TaskQuestionMapService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<TaskQuestionMapController>(TaskQuestionMapController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
