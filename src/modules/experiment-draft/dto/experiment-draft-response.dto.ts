/*
 * Copyright (c) 2026, lapic-ufjf
 * Licensed under The MIT License [see LICENSE for details]
 */

import { ApiProperty } from '@nestjs/swagger';

export class ExperimentDraftResponseDto {
  @ApiProperty({ description: 'Draft ID', example: '6b1e8c1a-3f7a-4a02-92f9-4b0d7a5d2a11' })
  _id: string;

  @ApiProperty({ description: 'Owner user ID', example: '64d2f4a8e5f9b20b1c8a9f10' })
  owner_id: string;

  @ApiProperty({
    description: 'Partial, in-progress experiment creation wizard state',
    example: { ExperimentTitle: 'Bias Study A', step: 2 },
  })
  payload: Record<string, unknown>;

  @ApiProperty({ description: 'Creation timestamp', example: '2026-02-24T13:30:00.000Z' })
  createdAt: Date;

  @ApiProperty({ description: 'Last update timestamp', example: '2026-02-24T13:30:00.000Z' })
  lastChangeAt: Date;
}
