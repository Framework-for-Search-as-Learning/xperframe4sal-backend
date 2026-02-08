/*
 * Copyright (c) 2026, marcelomachado
 * Licensed under The MIT License [see LICENSE for details]
 */

import {IsNotEmpty, IsString} from 'class-validator';
import {SurveyAnswer} from 'src/modules/survey-answer2/entity/survey-answer.entity';

export class CreateUserTaskByRule {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  surveyId: string;

  @IsNotEmpty()
  surveyAnswer: SurveyAnswer;
}
