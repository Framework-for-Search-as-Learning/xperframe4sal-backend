/*
 * Copyright (c) 2026, lapic-ufjf
 * Licensed under The MIT License [see LICENSE for details]
 */

import { Test, TestingModule } from '@nestjs/testing';
import { UserExperimentService } from './user-experiment.service';

describe('UserExperimentService', () => {
  let service: UserExperimentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserExperimentService],
    }).compile();

    service = module.get<UserExperimentService>(UserExperimentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
