/*
 * Copyright (c) 2026, lapic-ufjf
 * Licensed under The MIT License [see LICENSE for details]
 */

import { Test, TestingModule } from '@nestjs/testing';
import { UserTaskSessionController } from './user-task-session.controller';

describe('UserTaskSessionController', () => {
  let controller: UserTaskSessionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserTaskSessionController],
    }).compile();

    controller = module.get<UserTaskSessionController>(UserTaskSessionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
