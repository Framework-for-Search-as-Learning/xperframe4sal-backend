/*
 * Copyright (c) 2026, lapic-ufjf
 * Licensed under The MIT License [see LICENSE for details]
 */

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { SurveyAnswer } from 'src/modules/survey-answer/entity/survey-answer.entity';

export class CreateUserTaskByRule {
  @ApiProperty({ description: 'User ID', example: '64d2f4a8e5f9b20b1c8a9f10' })
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty({ description: 'Survey ID', example: '64d2f4a8e5f9b20b1c8a9f11' })
  @IsNotEmpty()
  @IsString()
  surveyId: string;

  @ApiProperty({ description: 'Survey answer payload used to select tasks' })
  @IsNotEmpty()
  surveyAnswer: SurveyAnswer;
}
