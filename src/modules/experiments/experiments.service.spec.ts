/*
 * Copyright (c) 2026, marcelomachado
 * Licensed under The MIT License [see LICENSE for details]
 */

import { Test, TestingModule } from '@nestjs/testing';
import { ExperimentsService } from './experiments.service';

describe('Experiments2Service', () => {
  let service: ExperimentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExperimentsService],
    }).compile();

    service = module.get<ExperimentsService>(ExperimentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
