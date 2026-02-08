/*
 * Copyright (c) 2026, marcelomachado
 * Licensed under The MIT License [see LICENSE for details]
 */

import { Test, TestingModule } from '@nestjs/testing';
import { Icf2Service } from './icf2.service';

describe('Icf2Service', () => {
  let service: Icf2Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Icf2Service],
    }).compile();

    service = module.get<Icf2Service>(Icf2Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
