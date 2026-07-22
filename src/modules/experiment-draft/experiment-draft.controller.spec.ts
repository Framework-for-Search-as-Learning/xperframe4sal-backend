/*
 * Copyright (c) 2026, lapic-ufjf
 * Licensed under The MIT License [see LICENSE for details]
 */

import { ForbiddenException } from '@nestjs/common';
import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';

import { UserService } from '../user/user.service';
import { ExperimentDraftController } from './experiment-draft.controller';
import { ExperimentDraftService } from './experiment-draft.service';

describe('ExperimentDraftController', () => {
  let controller: ExperimentDraftController;
  let experimentDraftService: {
    upsert: jest.Mock;
    find: jest.Mock;
    remove: jest.Mock;
  };
  let userService: { findOneByEmail: jest.Mock };

  const ownerRequest = (email: string) => ({ user: { email } }) as never;

  beforeEach(async () => {
    experimentDraftService = {
      upsert: jest.fn(),
      find: jest.fn(),
      remove: jest.fn(),
    };
    userService = { findOneByEmail: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExperimentDraftController],
      providers: [
        { provide: ExperimentDraftService, useValue: experimentDraftService },
        { provide: UserService, useValue: userService },
      ],
    }).compile();

    controller = module.get<ExperimentDraftController>(ExperimentDraftController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('ownership check', () => {
    it('rejects requests whose JWT owner does not match the ownerId param', async () => {
      userService.findOneByEmail.mockResolvedValue({ _id: 'someone-else' });

      await expect(
        controller.find(ownerRequest('victim@example.com'), 'owner-1'),
      ).rejects.toBeInstanceOf(ForbiddenException);
      expect(experimentDraftService.find).not.toHaveBeenCalled();
    });

    it('rejects upsert and remove the same way', async () => {
      userService.findOneByEmail.mockResolvedValue({ _id: 'someone-else' });

      await expect(
        controller.upsert(ownerRequest('victim@example.com'), 'owner-1', {
          payload: { step: 1 },
        }),
      ).rejects.toBeInstanceOf(ForbiddenException);
      await expect(
        controller.remove(ownerRequest('victim@example.com'), 'owner-1'),
      ).rejects.toBeInstanceOf(ForbiddenException);

      expect(experimentDraftService.upsert).not.toHaveBeenCalled();
      expect(experimentDraftService.remove).not.toHaveBeenCalled();
    });
  });

  describe('when the JWT owner matches the ownerId param', () => {
    beforeEach(() => {
      userService.findOneByEmail.mockResolvedValue({ _id: 'owner-1' });
    });

    it('delegates upsert to the service', async () => {
      const saved = { _id: 'draft-1', owner_id: 'owner-1', payload: { step: 1 } };
      experimentDraftService.upsert.mockResolvedValue(saved);

      const result = await controller.upsert(ownerRequest('owner@example.com'), 'owner-1', {
        payload: { step: 1 },
      });

      expect(experimentDraftService.upsert).toHaveBeenCalledWith('owner-1', { step: 1 });
      expect(result).toEqual(saved);
    });

    it('delegates find to the service', async () => {
      const draft = { _id: 'draft-1', owner_id: 'owner-1', payload: {} };
      experimentDraftService.find.mockResolvedValue(draft);

      const result = await controller.find(ownerRequest('owner@example.com'), 'owner-1');

      expect(experimentDraftService.find).toHaveBeenCalledWith('owner-1');
      expect(result).toEqual(draft);
    });

    it('delegates remove to the service', async () => {
      await controller.remove(ownerRequest('owner@example.com'), 'owner-1');

      expect(experimentDraftService.remove).toHaveBeenCalledWith('owner-1');
    });
  });
});
