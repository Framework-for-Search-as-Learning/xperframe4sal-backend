/*
 * Copyright (c) 2026, lapic-ufjf
 * Licensed under The MIT License [see LICENSE for details]
 */

import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { SurveyAnswer } from 'src/modules/survey-answer/entity/survey-answer.entity';
import { Task } from 'src/modules/task/entities/task.entity';

export class CreateUserTaskBalancedDto {
  @ApiProperty({ description: 'User ID', example: '64d2f4a8e5f9b20b1c8a9f10' })
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty({ description: 'Experiment ID', example: '64d2f4a8e5f9b20b1c8a9f12' })
  @IsNotEmpty()
  @IsString()
  experimentId: string;

  @ApiProperty({ description: 'Candidate task (group) list', type: [Task] })
  @IsNotEmpty()
  @IsArray()
  tasks: Task[];

  @ApiProperty({ description: 'Survey answer just submitted by the user' })
  @IsNotEmpty()
  surveyAnswer: SurveyAnswer;

  @ApiProperty({
    description: 'All answers for this survey, used to compute current group averages',
    type: [SurveyAnswer],
  })
  @IsArray()
  allSurveyAnswers: SurveyAnswer[];

  @ApiProperty({
    description: 'Experiment-level balancing rule: "score" (whole survey) or "question" (specific question)',
    required: false,
  })
  @IsOptional()
  @IsString()
  ruleType?: string;

  @ApiProperty({
    description: 'Question ids used to compute the balancing score when ruleType is "question"',
    required: false,
  })
  @IsOptional()
  @IsArray()
  questionIds?: string[];
}
