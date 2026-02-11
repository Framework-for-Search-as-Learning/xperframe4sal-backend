/*
 * Copyright (c) 2026, marcelomachado
 * Licensed under The MIT License [see LICENSE for details]
 */

import { Test, TestingModule } from '@nestjs/testing';
import { UserExperimentsService } from './user-experiments.service';

describe('UserExperimentsService', () => {
  let service: UserExperimentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserExperimentsService],
    }).compile();

    service = module.get<UserExperimentsService>(UserExperimentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
