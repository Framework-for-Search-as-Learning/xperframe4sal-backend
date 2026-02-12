/*
 * Copyright (c) 2026, lapic-ufjf
 * Licensed under The MIT License [see LICENSE for details]
 */

import { Test, TestingModule } from '@nestjs/testing';
import { IcfService } from './icf.service';

describe('IcfService', () => {
  let service: IcfService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IcfService],
    }).compile();

    service = module.get<IcfService>(IcfService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
