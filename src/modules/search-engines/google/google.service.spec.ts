/*
 * Copyright (c) 2026, lapic-ufjf
 * Licensed under The MIT License [see LICENSE for details]
 */

import { Test, TestingModule } from '@nestjs/testing';
import { GoogleService } from './google.service';
import { HttpService } from '../../http/http.service';
import { TaskService } from '../../task/task.service';

describe('GoogleService', () => {
  let service: GoogleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GoogleService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
            head: jest.fn(),
          },
        },
        {
          provide: TaskService,
          useValue: {
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<GoogleService>(GoogleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
