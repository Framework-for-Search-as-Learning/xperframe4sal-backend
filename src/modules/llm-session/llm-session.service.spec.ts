/*
 * Copyright (c) 2026, lapic-ufjf
 * Licensed under The MIT License [see LICENSE for details]
 */

import { Test, TestingModule } from '@nestjs/testing';
import { LlmSessionService } from './llm-session.service';

describe('LlmSessionService', () => {
  let service: LlmSessionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LlmSessionService],
    }).compile();

    service = module.get<LlmSessionService>(LlmSessionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
