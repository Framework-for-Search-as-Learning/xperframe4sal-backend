/*
 * Copyright (c) 2026, lapic-ufjf
 * Licensed under The MIT License [see LICENSE for details]
 */

import { Test, TestingModule } from '@nestjs/testing';
import { UserExperimentController } from './user-experiment.controller';

describe('UserExperimentController', () => {
  let controller: UserExperimentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserExperimentController],
    }).compile();

    controller = module.get<UserExperimentController>(UserExperimentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
