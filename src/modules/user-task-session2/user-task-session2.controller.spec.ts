/*
 * Copyright (c) 2026, marcelomachado
 * Licensed under The MIT License [see LICENSE for details]
 */

import { Test, TestingModule } from '@nestjs/testing';
import { UserTaskSession2Controller } from './user-task-session2.controller';

describe('UserTaskSession2Controller', () => {
  let controller: UserTaskSession2Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserTaskSession2Controller],
    }).compile();

    controller = module.get<UserTaskSession2Controller>(UserTaskSession2Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
