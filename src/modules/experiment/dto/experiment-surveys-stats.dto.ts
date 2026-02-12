/*
 * Copyright (c) 2026, lapic-ufjf
 * Licensed under The MIT License [see LICENSE for details]
 */

import { ApiProperty } from '@nestjs/swagger';
import { SurveyStatsDto } from 'src/modules/survey/dto/survey-stats.dto';

export class ExperimentSurveyStatsDto {
  @ApiProperty({ type: [SurveyStatsDto] })
  surveys: SurveyStatsDto[];
}
