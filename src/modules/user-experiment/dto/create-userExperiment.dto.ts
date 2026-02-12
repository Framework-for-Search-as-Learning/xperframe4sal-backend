/*
 * Copyright (c) 2026, lapic-ufjf
 * Licensed under The MIT License [see LICENSE for details]
 */


import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsObject, IsOptional, IsString} from 'class-validator';
import {StepsType} from 'src/modules/experiment/entity/experiment.entity';

export class CreateUserExperimentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  experimentId: string;

  @ApiProperty()
  @IsOptional()
  @IsObject()
  stepsCompleted?: Record<StepsType, boolean>;
}
