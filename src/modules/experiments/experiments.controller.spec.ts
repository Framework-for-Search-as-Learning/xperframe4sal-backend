/*
 * Copyright (c) 2026, marcelomachado
 * Licensed under The MIT License [see LICENSE for details]
 */

import { Test, TestingModule } from '@nestjs/testing';
import { ExperimentsController } from './experiments.controller';

describe('ExperimentsController', () => {
  let controller: ExperimentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExperimentsController],
    }).compile();

    controller = module.get<ExperimentsController>(ExperimentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
