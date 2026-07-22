/*
 * Copyright (c) 2026, lapic-ufjf
 * Licensed under The MIT License [see LICENSE for details]
 */

import { BaseEntity } from 'src/model/base-entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class ExperimentDraft extends BaseEntity {
  @Column({ unique: true })
  owner_id: string;

  @Column({ type: 'jsonb' })
  payload: Record<string, unknown>;
}
