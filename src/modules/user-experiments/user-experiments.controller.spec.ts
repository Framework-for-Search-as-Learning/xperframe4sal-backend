/*
 * Copyright (c) 2026, lapic-ufjf
 * Licensed under The MIT License [see LICENSE for details]
 */

import { Test, TestingModule } from '@nestjs/testing';
import { UserExperimentsController } from './user-experiments.controller';

describe('UserExperimentsController', () => {
  let controller: UserExperimentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserExperimentsController],
    }).compile();

    controller = module.get<UserExperimentsController>(UserExperimentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
