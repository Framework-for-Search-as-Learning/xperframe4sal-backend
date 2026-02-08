/*
 * Copyright (c) 2026, marcelomachado
 * Licensed under The MIT License [see LICENSE for details]
 */

import { Test, TestingModule } from '@nestjs/testing';
import { Icf2Controller } from './icf2.controller';

describe('Icf2Controller', () => {
  let controller: Icf2Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Icf2Controller],
    }).compile();

    controller = module.get<Icf2Controller>(Icf2Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
