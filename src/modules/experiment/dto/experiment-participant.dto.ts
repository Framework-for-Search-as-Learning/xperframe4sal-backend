/*
 * Copyright (c) 2026, lapic-ufjf
 * Licensed under The MIT License [see LICENSE for details]
 */

import { ApiProperty } from '@nestjs/swagger';
import { UserExperimentStatus } from 'src/modules/user-experiment/entities/user-experiments.entity';

export class ExperimentParticipantDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty({ enum: UserExperimentStatus })
  status: UserExperimentStatus;

  @ApiProperty()
  startDate: Date;

  @ApiProperty()
  completionDate: Date;

  @ApiProperty({ description: 'Time taken in milliseconds' })
  timeTaken: number;

  @ApiProperty({ description: 'Progress percentage (0-100)' })
  progress: number;
}
