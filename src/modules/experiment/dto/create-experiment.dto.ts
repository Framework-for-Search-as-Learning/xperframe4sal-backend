/*
 * Copyright (c) 2026, lapic-ufjf
 * Licensed under The MIT License [see LICENSE for details]
 */

import {IsNotEmpty, IsOptional, IsString} from 'class-validator';
import {TaskProps} from '../entity/experiment.entity';
import {CreateSurveyDto} from 'src/modules/survey/dto/create-survey.dto';
import {ApiProperty} from '@nestjs/swagger';

export class CreateExperimentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  status: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  ownerId: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  summary: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  typeExperiment: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  betweenExperimentType: string;
  //Ver como fazer a relação
  //tasks: Task[];
  tasksProps: TaskProps[];
  //;userProps: string[];
  surveysProps: CreateSurveyDto[];

  icf: {title: string; description: string};

  
}
