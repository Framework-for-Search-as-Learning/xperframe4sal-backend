/*
 * Copyright (c) 2026, lapic-ufjf
 * Licensed under The MIT License [see LICENSE for details]
 */

import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { ExperimentDraft } from './entity/experiment-draft.entity';
import { ExperimentDraftService } from './experiment-draft.service';

describe('ExperimentDraftService', () => {
  let service: ExperimentDraftService;
  let experimentDraftRepository: {
    findOneBy: jest.Mock;
    save: jest.Mock;
    create: jest.Mock;
    update: jest.Mock;
    delete: jest.Mock;
  };

  beforeEach(async () => {
    experimentDraftRepository = {
      findOneBy: jest.fn(),
      save: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExperimentDraftService,
        {
          provide: getRepositoryToken(ExperimentDraft),
          useValue: experimentDraftRepository,
        },
      ],
    }).compile();

    service = module.get<ExperimentDraftService>(ExperimentDraftService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('upsert', () => {
    it('creates a new draft when none exists for the owner', async () => {
      experimentDraftRepository.findOneBy.mockResolvedValue(null);
      const created = { owner_id: 'owner-1', payload: { step: 1 } };
      experimentDraftRepository.create.mockReturnValue(created);
      experimentDraftRepository.save.mockResolvedValue({
        _id: 'draft-1',
        ...created,
      });

      const result = await service.upsert('owner-1', { step: 1 });

      expect(experimentDraftRepository.create).toHaveBeenCalledWith({
        owner_id: 'owner-1',
        payload: { step: 1 },
      });
      expect(experimentDraftRepository.save).toHaveBeenCalledWith(created);
      expect(result).toEqual({ _id: 'draft-1', ...created });
    });

    it('updates the existing draft for the owner instead of creating a duplicate', async () => {
      const existing = { _id: 'draft-1', owner_id: 'owner-1', payload: { step: 1 } };
      experimentDraftRepository.findOneBy
        .mockResolvedValueOnce(existing)
        .mockResolvedValueOnce({ ...existing, payload: { step: 2 } });

      const result = await service.upsert('owner-1', { step: 2 });

      expect(experimentDraftRepository.update).toHaveBeenCalledWith(
        { _id: 'draft-1' },
        { payload: { step: 2 } },
      );
      expect(experimentDraftRepository.save).not.toHaveBeenCalled();
      expect(result).toEqual({ ...existing, payload: { step: 2 } });
    });
  });

  describe('find', () => {
    it('looks up the draft by owner_id', async () => {
      const draft = { _id: 'draft-1', owner_id: 'owner-1', payload: {} };
      experimentDraftRepository.findOneBy.mockResolvedValue(draft);

      const result = await service.find('owner-1');

      expect(experimentDraftRepository.findOneBy).toHaveBeenCalledWith({
        owner_id: 'owner-1',
      });
      expect(result).toEqual(draft);
    });
  });

  describe('remove', () => {
    it('deletes the draft by owner_id', async () => {
      await service.remove('owner-1');

      expect(experimentDraftRepository.delete).toHaveBeenCalledWith({
        owner_id: 'owner-1',
      });
    });
  });
});
