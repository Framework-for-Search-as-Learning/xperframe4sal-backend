/*
 * Copyright (c) 2026, lapic-ufjf
 * Licensed under The MIT License [see LICENSE for details]
 */

import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { QuestionType } from 'src/modules/survey/dto/question.dto';

export class AnswerOptionsDTO {
  @ApiProperty({ description: 'Option statement', example: 'Strongly agree' })
  @IsString()
  statement: string;

  @ApiProperty({ description: 'Option score', example: 5 })
  @IsNumber()
  score: number;
}

export class AnswerDTO {
  @ApiProperty({ description: 'Question ID', example: '64d2f4a8e5f9b20b1c8a9f33' })
  @IsString()
  id: string;

  @ApiProperty({ description: 'Question statement', example: 'How confident are you?' })
  @IsString()
  questionStatement: string;

  @ApiProperty({ enum: QuestionType, description: 'Question type' })
  @IsEnum(QuestionType)
  questionType: QuestionType;

  @ApiProperty({ type: [AnswerOptionsDTO], required: false, description: 'Selected options' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnswerOptionsDTO)
  @IsOptional()
  selectedOptions?: AnswerOptionsDTO[];

  @ApiProperty({ description: 'Free text answer', required: false, example: 'My response' })
  @IsString()
  @IsOptional()
  textAnswer?: string;

  @ApiProperty({ type: [AnswerDTO], required: false, description: 'Sub-answers for nested questions' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnswerDTO)
  @IsOptional()
  subAnswer?: AnswerDTO[];

  @ApiProperty({ description: 'Score for this answer', required: false, example: 3 })
  @IsOptional()
  @IsNumber()
  score?: number = 0;
}
