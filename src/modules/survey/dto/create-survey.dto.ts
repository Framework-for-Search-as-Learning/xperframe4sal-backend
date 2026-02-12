/*
 * Copyright (c) 2026, lapic-ufjf
 * Licensed under The MIT License [see LICENSE for details]
 */

import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import {SurveyType} from '../entity/survey.entity';
import {Type} from 'class-transformer';
import {ApiProperty} from '@nestjs/swagger';
import {QuestionDTO} from './question.dto';

export class CreateSurveyDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  uuid: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({enum: SurveyType})
  @IsEnum(SurveyType)
  type: SurveyType;

  @ApiProperty({type: [QuestionDTO]})
  @IsArray()
  @ValidateNested({each: true})
  @Type(() => QuestionDTO)
  questions: QuestionDTO[];

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  experimentId: string;
}
