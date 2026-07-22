/*
 * Copyright (c) 2026, lapic-ufjf
 * Licensed under The MIT License [see LICENSE for details]
 */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ExperimentDraft } from './entity/experiment-draft.entity';

@Injectable()
export class ExperimentDraftService {
  constructor(
    @InjectRepository(ExperimentDraft)
    private readonly experimentDraftRepository: Repository<ExperimentDraft>,
  ) { }

  async upsert(
    ownerId: string,
    payload: Record<string, unknown>,
  ): Promise<ExperimentDraft> {
    const existing = await this.find(ownerId);
    if (existing) {
      await this.experimentDraftRepository.update(
        { _id: existing._id },
        { payload },
      );
      return this.find(ownerId);
    }
    return this.experimentDraftRepository.save(
      this.experimentDraftRepository.create({ owner_id: ownerId, payload }),
    );
  }

  async find(ownerId: string): Promise<ExperimentDraft> {
    return await this.experimentDraftRepository.findOneBy({
      owner_id: ownerId,
    });
  }

  async remove(ownerId: string): Promise<void> {
    await this.experimentDraftRepository.delete({ owner_id: ownerId });
  }
}
