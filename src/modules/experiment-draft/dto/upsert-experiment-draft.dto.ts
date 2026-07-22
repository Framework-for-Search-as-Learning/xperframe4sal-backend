/*
 * Copyright (c) 2026, lapic-ufjf
 * Licensed under The MIT License [see LICENSE for details]
 */

import { ApiProperty } from '@nestjs/swagger';
import { IsObject } from 'class-validator';

export class UpsertExperimentDraftDto {
  @ApiProperty({
    description: 'Partial, in-progress experiment creation wizard state',
    example: { ExperimentTitle: 'Bias Study A', step: 2 },
  })
  @IsObject()
  payload: Record<string, unknown>;
}
