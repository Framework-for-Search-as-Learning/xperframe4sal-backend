/*
 * Copyright (c) 2026, marcelomachado
 * Licensed under The MIT License [see LICENSE for details]
 */

import { Test, TestingModule } from '@nestjs/testing';
import { PuppeteerController } from './puppeteer.controller';
import { PuppeteerService } from './puppeteer.service';

describe('PuppeteerController', () => {
  let controller: PuppeteerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PuppeteerController],
      providers: [PuppeteerService],
    }).compile();

    controller = module.get<PuppeteerController>(PuppeteerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
