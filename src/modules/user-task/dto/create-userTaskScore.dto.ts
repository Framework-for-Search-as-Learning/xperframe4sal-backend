/*
 * Copyright (c) 2026, lapic-ufjf
 * Licensed under The MIT License [see LICENSE for details]
 */

import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { SurveyAnswer } from 'src/modules/survey-answer/entity/survey-answer.entity';

export class CreateUserTaskScoreDto {
  @ApiProperty({ description: 'User ID', example: '64d2f4a8e5f9b20b1c8a9f10' })
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty({ description: 'Task IDs to consider', example: ['64d2f4a8e5f9b20b1c8a9f22'] })
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  taskIds: string[];

  @ApiProperty({ description: 'Survey answer used to compute score' })
  @IsNotEmpty()
  surveyAnswer: SurveyAnswer;
}
