/*
 * Copyright (c) 2026, marcelomachado
 * Licensed under The MIT License [see LICENSE for details]
 */

import { Test, TestingModule } from '@nestjs/testing';
import { UserTaskSession2Service } from './user-task-session2.service';

describe('UserTaskSession2Service', () => {
  let service: UserTaskSession2Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserTaskSession2Service],
    }).compile();

    service = module.get<UserTaskSession2Service>(UserTaskSession2Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
