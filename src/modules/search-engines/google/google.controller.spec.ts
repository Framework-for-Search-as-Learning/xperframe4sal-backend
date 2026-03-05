/*
 * Copyright (c) 2026, lapic-ufjf
 * Licensed under The MIT License [see LICENSE for details]
 */

import { Test, TestingModule } from '@nestjs/testing';
import { GoogleController } from './google.controller';
import { GoogleService } from './google.service';

describe('GoogleController', () => {
  let controller: GoogleController;
  let service: GoogleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GoogleController],
      providers: [
        {
          provide: GoogleService,
          useValue: {
            query: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<GoogleController>(GoogleController);
    service = module.get<GoogleService>(GoogleService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
