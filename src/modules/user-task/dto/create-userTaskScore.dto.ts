/*
 * Copyright (c) 2026, marcelomachado
 * Licensed under The MIT License [see LICENSE for details]
 */

import {IsArray, IsNotEmpty, /*IsNumber,*/ IsString} from 'class-validator';
import {SurveyAnswer} from 'src/modules/survey-answer/entity/survey-answer.entity';

export class CreateUserTaskScoreDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsArray()
  @IsString({each: true})
  taskIds: string[];

  @IsNotEmpty()
  surveyAnswer: SurveyAnswer;

  /*@ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  score: number;*/
}
