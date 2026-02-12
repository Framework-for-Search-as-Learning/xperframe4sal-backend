/*
 * Copyright (c) 2026, lapic-ufjf
 * Licensed under The MIT License [see LICENSE for details]
 */

import { ApiProperty } from '@nestjs/swagger';

export class ExperimentStatsDto {
  @ApiProperty({ description: 'Total number of participants' })
  totalParticipants: number;

  @ApiProperty({ description: 'Number of participants who finished' })
  finishedParticipants: number;

  @ApiProperty({ description: 'Number of participants in progress' })
  inProgressParticipants: number;

  @ApiProperty({ description: 'Percentage of completion' })
  completionPercentage: number;
}
