/*
 * Copyright (c) 2026, lapic-ufjf
 * Licensed under The MIT License [see LICENSE for details]
 */

//import {UserProps} from 'src/model/experiment.entity';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TaskProps } from '../entity/experiment.entity';
import { CreateSurveyDto } from 'src/modules/survey/dto/create-survey.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateExperimentDto {
  @ApiProperty({ description: 'Experiment name', example: 'Bias Study A' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Owner user ID', example: '64d2f4a8e5f9b20b1c8a9f10' })
  @IsNotEmpty()
  @IsString()
  ownerId: string;

  @ApiProperty({ description: 'Experiment summary', example: 'Comparing two search strategies', required: false })
  @IsOptional()
  @IsString()
  summary: string;

  @ApiProperty({ description: 'Experiment type identifier', example: 'between' })
  @IsNotEmpty()
  @IsString()
  typeExperiment: string;

  @ApiProperty({ description: 'Between-experiment design type', example: 'A/B' })
  @IsNotEmpty()
  @IsString()
  betweenExperimentType: string;

  //Ver como fazer a relação
  //tasks: Task[];
  @ApiProperty({
    description: 'Task definitions used in the experiment',
    type: 'array',
    items: { type: 'object' },
  })
  tasksProps: TaskProps[];
  //;userProps: string[];
  @ApiProperty({
    description: 'Survey definitions used in the experiment',
    type: [CreateSurveyDto],
  })
  surveysProps: CreateSurveyDto[];

  @ApiProperty({
    description: 'ICF (consent) information',
    example: { title: 'Consent', description: 'You agree to participate.' },
  })
  icf: { title: string; description: string };


}
