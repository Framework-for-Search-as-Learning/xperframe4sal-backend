/*
 * Copyright (c) 2026, lapic-ufjf
 * Licensed under The MIT License [see LICENSE for details]
 */

import {ApiProperty} from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import {AnswerDTO} from './answers.dto';
import {Type} from 'class-transformer';

export class CreateSurveyAnswerDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  surveyId: string;

  @IsArray()
  @ValidateNested({each: true})
  @Type(() => AnswerDTO)
  answers: AnswerDTO[];

  @IsOptional()
  @IsNumber()
  score?: number = 0;
}
