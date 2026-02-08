/*
 * Copyright (c) 2026, marcelomachado
 * Licensed under The MIT License [see LICENSE for details]
 */

import {IsArray, IsNotEmpty, IsString} from 'class-validator';
import {SurveyAnswer} from 'src/modules/survey-answer2/entity/survey-answer.entity';

export class CreateUserTaskAvgQuestScoreDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  surveyAnswer: SurveyAnswer;

  @IsNotEmpty()
  @IsArray()
  @IsString({each: true})
  taskIds: string[];

  @IsNotEmpty()
  @IsArray()
  questionsIds: string[];
}
