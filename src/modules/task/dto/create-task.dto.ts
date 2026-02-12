/*
 * Copyright (c) 2026, lapic-ufjf
 * Licensed under The MIT License [see LICENSE for details]
 */

import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  summary: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  search_source: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  search_model: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  experiment_id: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  survey_id?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  rule_type?: string; //score || question

  @ApiProperty()
  @IsOptional()
  @IsArray()
  questionsId?: string[];

  //TODO Voltar com @IsNumber apos corrigir no front
  @ApiProperty()
  @IsOptional()
  min_score?: number;

  @ApiProperty()
  @IsOptional()
  max_score?: number;
}
